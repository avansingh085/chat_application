import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from './Message';
import { setMessageChat } from './globalSlice';
import DocUpload from './DocUpload'
const Chat = ({ socket }) => {
  const [message, setMessage] = useState('');
  const receiver = useSelector((state) => state.Chat?.CurrChat); 
  const clientMobile = useSelector((state) => state.Chat.Mobile); 
  const messages = useSelector((state) => state.Chat.Message) || [];
  const [IsShowUploadDoc,setUploadDoc]=useState(0);
  const dispatch = useDispatch();
  const filteredMessages = messages.filter(
    (msg) =>
      (msg.from === clientMobile && msg.receiver === receiver.mobile) ||
      (msg.from === receiver.mobile && msg.receiver === clientMobile)
  );

  useEffect(() => {
    
    const handlePublicMessage = ({ from, message }) => {
      console.log('Public Message:', { from, message });
    };
    const handlePrivateMessage = ({ from, message, receiver ,isGroup,user}) => {
      const updatedMessages = [...messages, { from, message, receiver ,isGroup,user}];
      dispatch(setMessageChat(updatedMessages)); 
    };
    const handlePrivateMessageError = ({ message }) => {
      console.error('Private Message Error:', message);
    };
    socket.on('chat message', handlePublicMessage);
    socket.on('private message', handlePrivateMessage);
    socket.on('private message error', handlePrivateMessageError);

   
    return () => {
      socket.off('chat message', handlePublicMessage);
      socket.off('private message', handlePrivateMessage);
      socket.off('private message error', handlePrivateMessageError);
    };
  }, [socket, dispatch, receiver, clientMobile, messages]); 

  const sendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return; 

    if (receiver) {
     
      const updatedMessages = [
        ...messages,
        { from: clientMobile, message, receiver: receiver.receiver,isGroup:receiver.isGroup,user:receiver.user},
      ];
      dispatch(setMessageChat(updatedMessages));

      socket.emit('private message', {
        receiver: receiver.receiver,
        from: clientMobile,
        message,
        isGroup:receiver.isGroup,
        user:receiver.user,
      });
    } else {
    
      socket.emit('chat message', message);
    }

    setMessage(''); 
  };

  return (
    <div className=" sticky w-full max-w-screen-xl mx-auto h-screen  flex flex-col bg-gray-100 rounded-lg shadow-xl border">
    
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
      <div className="flex-1 overflow-y-auto p-4 bg-[url('https://img.freepik.com/free-vector/vector-social-contact-seamless-pattern-white-blue_1284-41919.jpg?uid=R180391431&ga=GA1.1.490885213.1734264155&semt=ais_hybrid')] bg-cover bg-center thin-scrollbar">
        {filteredMessages.map((msg, index) => (
          <Message key={`${msg.from}-${index}`} from={msg.from} message={msg.message} />
        ))}
         {
          IsShowUploadDoc ? <DocUpload/>:null
        }
      </div>
      <form
        onSubmit={sendMessage}
        className="p-1 flex items-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 rounded-b-lg"
      >
        <button onClick={()=>setUploadDoc(pre=>!pre)} className='h-12'><img className='h-12 w-20 mr-2 rounded-3xl' src="https://www.shutterstock.com/shutterstock/photos/471592475/display_1500/stock-vector-whatsapp-attach-file-icon-vector-user-interface-element-mobile-application-paper-clip-sign-lond-471592475.jpg"/></button>
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
