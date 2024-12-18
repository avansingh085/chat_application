import './App.css';
import Main from './main';
import store from "./confiSlice.js";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import {setSocket} from './globalSlice.js';
import { useEffect } from 'react';
import {io} from 'socket.io-client'
//wss://chat-backend-9s3n.onrender.com
const socket = io("ws://chat-backend-9s3n.onrender.com")
function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
     <Main socket={socket}/>
    </Provider>
    </BrowserRouter>
  );
}

export default App;
