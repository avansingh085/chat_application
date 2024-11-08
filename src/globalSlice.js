import { createSlice } from '@reduxjs/toolkit';
import {io } from 'socket.io-client'
const initialState = {
  CurrChat:{name:'',mobile:0},
  Login:0,
  Username:"",
  Password:"",
  Email:"",
  mobile:0,
  
};

const itemsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.Username=action.payload;
    },
   
    setLogin: (state, action) => {
     state.Login=action.payload;
    },
    setPassword: (state, action) => {
      state.Password = action.payload;
    },
    setCurrChat: (state, action) => {
      state.CurrChat = action.payload;
    },
    setEmail: (state, action) => {
        state.Email = action.payload;
      },
      setMobile:(state,action)=>{
        state.Mobile=action.payload;
      }
    
  },
});

export const { setUserName, setLogin, setCurrChat, setPassword,setEmail,setMobile } = itemsSlice.actions;
export default itemsSlice.reducer;
