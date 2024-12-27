import './App.css';
import Main from './main';
import store from "./confiSlice.js";
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import {setSocket} from './globalSlice.js';
import { useEffect } from 'react';
import {io} from 'socket.io-client'
import Admin from './Admin';
//http://chat-backend-9s3n.onrender.com
const socket = io("http://localhost:3001");
function App() {
  return (
    <BrowserRouter>
    <Provider store={store}>
     <Main socket={socket}/>
     {/* <Admin/> */}
    </Provider>
    </BrowserRouter>
  );
}

export default App;
