import { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { MessageInput } from "./MessageInput"
import { Messages } from "./Messages"
import { useAuth } from "../../Context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { useSocketContext } from "../../Context/SocketContext";

export const MessageContainer=()=>{
    const {selectedConversation,setSelectedConversation}=useConversation();
    return(
        <div className="w-full sm:w-[70%] lg:w-[35%] backdrop-blur-xl h-[75%] rounded-md border-white max-lg:h-[70%] overflow-y-hidden">
       {!selectedConversation?(<NoChatSelected/>):(
        <>
        <header className="h-10 py-1 w-full font-bold bg-gray-400 rounded-tr-lg rounded-tl-lg">
            <div className="flex ">
        <div className="w-8 rounded-full  ">
             <img src={selectedConversation?.profilepic} className="mx-4" />
             </div>
             <span className=" font-bold text-black text-xl mx-6"> {selectedConversation?.fullname}</span>
             </div>
             </header>
        <Messages/>
        <MessageInput/>
        </>
    )};
        </div>
    );
};



const NoChatSelected = () => {
	const {authUser}=useAuth();
	return (
        
           
		<div className=' flex flex-col items-center justify-center w-full h-full'>
         <div >
        <img src={authUser?.profilepic} className=" flex items-center mx-4 w-28 h-28 my-4" />
        </div>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p className=" text-2xl">Welcome 👋 {authUser.fullname} ❄</p>
				<p className=" text-xl">Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
        
	);
};
