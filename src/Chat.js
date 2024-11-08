// src/components/Chat.js
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Message from './Message';

const Chat = ({ socket }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState({});
  const username = useSelector((state) => state.Chat.Username);
  const receiver=useSelector(state=>state.Chat.CurrChat);

  useEffect(() => {
    // Listen for public chat messages
    socket.on('chat message', ({ from, msg }) => {
      console.log(from, msg, "Public Message");
      setMessages((prevMessages) => [...prevMessages, { from, msg }]);
    });

    // Listen for private messages
    socket.on('private message', ({ from, msg }) => {
      console.log(from, msg, "Private Message");
      setMessages((prevMessages) => [
        ...prevMessages,
        { from: from, msg, private: true }
      ]);
    });
    // Listen for errors in private messages (e.g., user not fou
    socket.on('private message error', ({ msg }) => {
      alert(msg);  // Show alert if user not found
    });

    // Listen for updated user list
    socket.on('user list', (users) => {
      setUsers(users);
    });

    // Clean up the event listeners when the component unmounts
    return () => {
      socket.off('chat message');
      socket.off('private message');
      socket.off('private message error');
      socket.off('user list');
    };
  }, [socket]);
console.log(receiver)
  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      if (localStorage.getItem('receiver')) {
        // Emit private message
       setMessages([...messages,{msg:message,private:false}])
        socket.emit('private message', { receiverName:receiver.name, msg: message });
      } else {
        // Emit public message
        socket.emit('chat message', message);
      }
      setMessage('');  // Clear message input after sending
    }
  };

  return (
    <div className=" w-9/12 h-screen   bg-white border rounded-lg shadow-lg">
      <div className="  overflow-y-auto p-4 space-y-2 h-5/6">
      <div className="flex  w-2/12 justify-evenly h-20  items-center ">
        <img src="https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&P=0&h=180"
           className="h-16 w-16 rounded-full space-x-4 "/>
          
        <h1 className="space-x-2 h-20 text-2xl mt-6">{receiver.name}Avan</h1>
      </div>
        {messages.map((msg, index) => (
          <Message
            key={index}
            from={msg.from}
            message={msg.msg}  // Use msg.msg to match the structure
            isPrivate={msg.private}
            to={msg.to}
          />
        ))}
      </div>
      <form onSubmit={sendMessage} className="p-4 flex  items-center justify-evenly  space-y-2 h-20 w-full  border-t mb-0">
        <input
          type="text"
          className=" border w-6/12  rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        
        <button className="bg-blue-500 w-2/12 text-white py-2 rounded-lg transition duration-300 hover:bg-blue-600" type="submit">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
