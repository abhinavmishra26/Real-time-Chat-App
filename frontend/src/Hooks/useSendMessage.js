import { useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

export const useSendMessage=()=>{
    const [loading ,setLoading]=useState();
    const{messages,setMessages,selectedConversation} =useConversation();

    const sendMessage=async(message)=>{
        setLoading(true)
    try{
        const {data}=await axios.post(`/api/mess/send/${selectedConversation._id}`,{message:message})
        if(data.success==false){
            setLoading(false);
        }
        setMessages([...messages,data]);

    }
    catch(error){
        toast.error(error.message);

    }
    finally{
        setLoading(false);
    }
}
return {sendMessage,loading};
}