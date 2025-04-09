import { useState } from "react"
import {useAuth} from "../Context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

export const useLogout=()=>{
    const [loading,setLoading]=useState(false);
    const  {setAuthUser}=useAuth();
    const {setSelectedConversation} =useConversation();
    
    const logout=async()=>{
    try{
        setLoading(true);
        const {data}=await axios.post("/api/auth/logout", { withCredentials: true });
        if(data.success===false){
            setLoading(false);
            console.log(data.message);
        }
        localStorage.removeItem("chatapp");
        setAuthUser(null);
        toast.success("Logout successfully")
        setSelectedConversation(null);
    }
    catch(error){
        toast.error(error.message);
    }
    finally{
        setLoading(false);
    }
    };

    return {loading,logout};
};