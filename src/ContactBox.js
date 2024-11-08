import {useDispatch} from 'react-redux';
import {setCurrChat} from './globalSlice';
function ContactBox({data}){
    console.log(data.name,data.number)
      let dispatch=useDispatch();
    return(
        <div className="h-20 cursor-pointer hover:bg-green-400 " onClick={()=>{dispatch(setCurrChat({name:data.name,number:data.number}))}}>
          
            <img  src="https://tse1.mm.bing.net/th?id=OIP.GHGGLYe7gDfZUzF_tElxiQHaHa&pid=Api&P=0&h=180" className="h-12 w-12 rounded"/>
            <h1>{data.name}</h1>
           
        </div>
    )
}
export default ContactBox;