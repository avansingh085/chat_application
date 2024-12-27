import {useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setContact } from './globalSlice';
function CreatGroup({setShowGroup}){
    const [groupName,setGroupName]=useState("");
    const [title,setTitle]=useState("");
    const dispatch=useDispatch();
    const User=useSelector((state)=>state.Chat.User);
    const [profile,setProfile]=useState("");
    const Contact=useSelector((state)=>state.Chat.Contact);
    const  [member,setMember]=useState({isGroup:1,user:'',title:'',img:'',receiver:[{user:User.user,img:User.img,mobile:User.mobile,title:User.title}]});
    async function handleGroupForm(){
        if(!groupName)
            return;
        setMember({...member,user:groupName,title:title,img:''});
        try{
           let res=await fetch('http://localhost:3001/creatGroup',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(member),
             });
             let res1=await res.json();
             if(res1.success)
             {
                dispatch(setContact([...Contact,member]));
             }
             else
             {
                console.log(res1.result);
             }
            
        }
        catch(err){

        }
        setShowGroup((pre)=>!pre);
       
   }
    return(
        <div className=" absolute z-10 grid  justify-center items-center ml-5 mt-36 h-96 w-96 rounded-lg bg-blue-300 shadow-2xl">
           <label>
              <div className="text-white">Group Name</div><input placeholder="Group Name" className="h-12 w-72 pl-1 outline-none mt-5" value={groupName} onChange={e=>setGroupName(e.target.value)}/>
               </label>
               <label>
               <div className="text-white">Title</div><input placeholder="title" value={title} onChange={e=>setTitle(e.target.value)} className="h-12 w-72 pl-1 outline-none shadow-lg "/>
               </label>
               <label>
               <div className="text-white">Profile img</div><input placeholder="icon-img-url" value={profile} onChange={e=>setProfile(e.target.value)} className="h-12 w-72 pl-1 outline-none "/>
               </label>
               <label>
                <button onClick={handleGroupForm} className=" h-14 w-44 rounded-lg text-white bg-blue-600">submit</button>
               </label>
        </div>
    )
}

export default CreatGroup