import { useGetMessages } from "../../Hooks/useGetMessages"
import useListenMessages from "../../Hooks/useListenMessages";
import { MessageSkeleton } from "../skeleton/MessageSkeleton";
import { Message } from "./Message";
import { useEffect, useRef } from "react";

export const Messages=()=>{
   const {loading,messages} =useGetMessages();
   useListenMessages();

   const lastMessageRef = useRef();


   useEffect(() => {
    setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    }, [messages]);

    return (
        <div  className="h-[80%] overflow-auto ">
            
            {!loading && messages.length >0 && messages.map((message)=> 
            <div key={message._id} ref={lastMessageRef}>
            <Message message={message} />
             </div>

            )}
            
           {loading && [...Array(3)].map((_,idx)=><MessageSkeleton key={idx}/>)}

           {!loading &&  messages.length===0 && (
            <p className="text-center text-white">Send a message to start the conversation</p>
           )}
         
           
        </div>
    )
}