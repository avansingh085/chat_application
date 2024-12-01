import Contact from './Contact.js';
import Chat from './Chat'
function ChatMessage({socket}){
    return(<div className="flex h-screen w-screen">
        <Contact  />
        <Chat socket={socket}/>
    </div>)
}
export default ChatMessage;