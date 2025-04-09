import { useAuth } from "../../Context/AuthContext"
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

export const Message=({message})=>{
     const {authUser} =useAuth();
     const {selectedConversation}=useConversation();
     const fromMe=message.senderId===authUser._id;
     const chatClassName = fromMe ? "chat-end" : "chat-start" ;
     let profilePic= fromMe ? authUser.profilepic: selectedConversation?.profilepic;
     const bubbleBgColor=fromMe?"bg-blue-500" : "bg-gray-800";
     const formattedTime=extractTime(message.createdAt);
     const  shakeClass=message.shouldShake ? "shake":""

    

    
    return(
        <div>
            <div className={`chat ${chatClassName} px-3 py-3`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
  
     
 
      <img
        alt="Tailwind CSS chat bubble component"
        src={profilePic}/>
    </div>
  </div>
  <div className={`chat-bubble text-white  rounded-2xl ${bubbleBgColor} ${shakeClass}`}>{message.message}</div>
  <div className="chat-footer text-white">{formattedTime}</div>
 
</div>
        </div>
    )
}
