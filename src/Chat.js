import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import { setMessageChat } from './globalSlice';

const Chat = ({ socket }) => {
  const [message, setMessage] = useState('');
  const receiver = useSelector((state) => state.Chat?.CurrChat); // Current chat receiver
  const messages = useSelector((state) => state.Chat.Message) || []; // Messages array
  const clientMobile = useSelector((state) => state.Chat.Mobile); // Client's mobile number
  const dispatch = useDispatch();

  useEffect(() => {
    // Handle receiving public messages
    const handlePublicMessage = ({ from, message }) => {
      console.log('Public Message:', { from, message });
    };

    // Handle receiving private messages
    const handlePrivateMessage = ({ from, message, receiver }) => {
      const updatedMessages = [...messages, { from, message, receiver }];
      dispatch(setMessageChat(updatedMessages)); // Update the Redux store with the new message
    };

    // Handle errors for private messages
    const handlePrivateMessageError = ({ message }) => {
      console.error('Private Message Error:', message);
    };

    // Attach socket listeners
    socket.on('chat message', handlePublicMessage);
    socket.on('private message', handlePrivateMessage);
    socket.on('private message error', handlePrivateMessageError);

    // Cleanup listeners on unmount
    return () => {
      socket.off('chat message', handlePublicMessage);
      socket.off('private message', handlePrivateMessage);
      socket.off('private message error', handlePrivateMessageError);
    };
  }, [socket, dispatch, receiver, clientMobile]); // No need to include 'messages' here

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return; // Ignore empty messages

    if (receiver?.mobile) {
      // Sending private message
      const updatedMessages = [
        ...messages,
        { from: clientMobile, message, receiver: receiver.mobile },
      ];
      dispatch(setMessageChat(updatedMessages));

      socket.emit('private message', {
        receiver: receiver.mobile,
        from: clientMobile,
        message,
      });
    } else {
      // Sending public message
      socket.emit('chat message', message);
    }

    setMessage(''); // Clear input field
  };

  // Filter messages for the current chat
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.from === clientMobile && msg.receiver === receiver.mobile) ||
      (msg.from === receiver.mobile && msg.receiver === clientMobile)
  );

  return (
    <div className="w-full max-w-screen-lg mx-auto h-screen flex flex-col bg-gray-100 rounded-lg shadow-xl border">
      {/* Chat Header */}
      <div className="flex items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <img
          src="https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&P=0&h=180"
          alt="User Avatar"
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-white shadow-md"
        />
        <h1 className="ml-4 text-sm sm:text-lg font-semibold truncate">
          {receiver?.name || 'Unknown User'}
        </h1>
      </div>

      {/* Messages Section */}
      <div className="flex-1 overflow-y-auto p-4 bg-white thin-scrollbar">
        {filteredMessages.map((msg, index) => (
          <Message key={`${msg.from}-${index}`} from={msg.from} message={msg.message} />
        ))}
      </div>

      {/* Input Section */}
      <form
        onSubmit={sendMessage}
        className="p-4 flex items-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-b-lg"
      >
        <input
          type="text"
          className="flex-1 p-3 mr-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
