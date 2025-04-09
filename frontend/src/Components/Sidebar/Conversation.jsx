import { useSocketContext } from "../../Context/SocketContext";
import useConveration from "../../zustand/useConversation"

export const Conversation=({conversation ,lastIdx,emoji})=>{
    const{selectedConversation,setSelectedConversation} =useConveration();
    const isSelected=selectedConversation?._id===conversation._id;

     const {onlineUsers}=useSocketContext();
     const isOnline=onlineUsers.includes(conversation._id);

    
    return(
    <div className="h-14 mx-0  ">
    <div className={`flex gap-2 items-center  rounded p-2 py-1 cursor-pointer px-6  ${isSelected?"bg-blue-600":""}`} onClick={()=>setSelectedConversation(conversation)}>
        <div className={`avatar ${isOnline? "avatar-online" :""}`}>
             <div className="w-10 rounded-full">
             <img src={conversation.profilepic} />
             </div>
        </div>
        
        <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
            <p className=" font-bold font-sans text-lg text-white">{conversation.fullname}</p> 
        <span className="text-xl ">{emoji}</span>
        </div>
        </div>
        
      


    </div> 
    {!lastIdx && <div className="divider px-3 mt-0 "/>}
    </div>
    )
}