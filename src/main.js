import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './index.css';
import Chat from './Chat.js'
import LoginBox from './login.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {setLogin,setUserName} from './globalSlice.js'
import { Route, Routes } from 'react-router-dom';
import ChatMessage from './ChatMessage.js';
function App({socket}) {
 
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Routes>
        <Route path='/' element={<LoginBox socket={socket}/>}/>
        <Route path='/Chat' element={<ChatMessage socket={socket}/>}/>
      </Routes>
      
    </div>
)}

export default App;
