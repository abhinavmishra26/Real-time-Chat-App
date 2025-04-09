import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

export const useGetMessages=()=>{
    const[loading ,setLoading]=useState(false);
    const{messages,setMessages,selectedConversation}=useConversation();

    useEffect(()=>{
        const getMessage=async()=>{
            setLoading(true);
            try{
                const {data}=await axios.get(`/api/mess/${selectedConversation._id}`);
                if(data.success===false){
                    setLoading(false);
                }
                setMessages(data);
            }
            catch(error){
                toast.error(error.message);
            }
            finally{
                setLoading(false);
            }
        }
        if(selectedConversation?._id) getMessage();

    },[selectedConversation?._id,setMessages])
    return {loading ,messages}
}