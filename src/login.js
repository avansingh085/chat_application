import React, { useState,useRef } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setLogin,setUserName,setCurrChat,setPassword,setEmail,setNumber} from './globalSlice'
import { useNavigate } from 'react-router-dom';

const LoginBox = ({socket}) => {
    console.log("hellow");
    const [isSignIn, setIsSignIn] = useState(1);
   
    const [username,setUsername]=useState("");
    let Navigate=useNavigate();
    let email=useRef("");
    let password=useRef("");
    let Number=useRef(0);
    let dispatch=useDispatch();
   function Handler(e){
    e.preventDefault();
    
    // console.log(username.current.value,"vana")
    // dispatch(setUserName(username.current.value));
    // dispatch(setPassword(password.current.value));
    // dispatch(setEmail(email.current.value));
    // dispatch(setNumber(Number.current.value));
    dispatch(setLogin(1));
   
        if (username.trim()) {
          socket.emit('new user', username);
        }
      console.log("AVNNNNNNNNNNNNNNNNNNNNNNNNN")
    Navigate("/Chat");
        if(isSignIn)
        {
            

        //    let res=await fetch('http://localhost:3001/signup',{
        //     method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ username:username.current.value,email:email.current.value,password:password.current.value }),
   
        //    }).then(res=>res.json()).then(res=>{
        //     if(res.result)
        //     {
              
        //     }
        //     else
        //     {

        //     }
        //    });
           
        }
        else{
            // let res=await fetch('http://localhost:3001/signup',{
            //     method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({email:email.current.value,password:password.current.value }),
       
            //    }).then(res=>res.json()).then(res=>{
            //     if(res.result)
            //     {
                  
            //     }
            //     else
            //     {
    
            //     }
            //    });
          }
         
    }
    return (
        <div className="flex items-center justify-center min-h-screen w-screen">
            
                    <form className="w-4/12">
                        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Login</h2>
                        <div className="mb-4">
                            <label className="block mb-1  text-gray-600" htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={username}
                                onChange={(e)=>setUsername(e.target.value)}
                                className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                required 
                            />
                        </div>
                        <div className="mb-6 ">
                            <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                ref={password}
                                className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                                required 
                            />
                        </div>
                        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600" onClick={Handler}>
                            Login
                        </button>
                    </form>
            
        </div>
    );
};

export default LoginBox;
