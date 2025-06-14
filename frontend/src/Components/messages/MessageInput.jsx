import { IoIosSend } from "react-icons/io";
import { useSendMessage } from "../../Hooks/useSendMessage";
import { useState } from "react";
export const MessageInput=()=>{
    const{sendMessage,loading} =useSendMessage();
    const [message,setMessage]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!message) return ;
        await sendMessage(message);
        setMessage("");
        
    };
    return( 
        <div className="py-3 mt-6 px-4 max-lg:mt-1">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className="relative ">
            <input type="text" placeholder="Send a message" value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full h-9 bg-gray-900 text-white rounded-md outline-white px-4"/>
            <button className="absolute inset-y-0 end-0 flex items-center px-3 text-xl "><IoIosSend /> </button>
            </div>
            </form>
        </div>
    )
}