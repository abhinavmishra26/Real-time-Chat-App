import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const useGetConverations=()=>{
    const [loading,setLoading]=useState(false);
    const [conversations,setConversations]=useState([]);

    useEffect(()=>{
        const getConversations=async()=>{
            setLoading(true);
            try{
                const {data}=await axios.get("/api/user/currentchatters");
                if(data.success===false){
                    setLoading(false);
                }
                setConversations(data);
            }
            catch(error){
                toast.error(error.message);

            }finally{
                setLoading(false);
            }

        }
        getConversations();
    },[])
    return {loading,conversations};
}

export default useGetConverations;