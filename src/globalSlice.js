import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  CurrChat: { name: '1111', mobile: '1111', messages: [] },
  User:{},
  Login: 0,
  Username: "",
  Password: "",
  Email: "",
  Mobile: '',
  addContact:[],
  Message:[], // An empty object for dynamic contact management
};
const itemsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.Username = action.payload;
    },
    setLogin: (state, action) => {
      state.Login = action.payload;
    },
    setUser:(state,action)=>{
      state.User=action.payload;
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
    setMobile: (state, action) => {
      state.Mobile = action.payload;
    },
    setMessageChat:(state,action)=>{
      state.Message=action.payload;
    },
    setAddContact:(state, action) => {
      state.addContact.push(action.payload);
    },
    setContact:(state,action)=>{
      state.addContact=action.payload;
    }
  },
});

export const { setUserName,setUser, setAddContact,setContact,setMessageChat, setLogin, setCurrChat, setPassword, setEmail, setMobile } = itemsSlice.actions;
export default itemsSlice.reducer;
