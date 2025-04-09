import { useAuth } from "./AuthContext";
import io from "socket.io-client";

import { createContext, useState, useEffect ,useContext} from "react";

export const SocketContext=createContext();


export const useSocketContext=()=>{
    return useContext(SocketContext);
}

export const SocketContextProvider=(props)=>{
    const [socket,setSocket]=useState(null);
    const [onlineUsers,setOnlineUsers]=useState([]);
    const {authUser} =useAuth();

    useEffect(()=>{
    if(authUser){
        const socket=io("https://real-time-chat-app-5yms.onrender.com",{
            query:{
                userId:authUser._id,
            },
        });
        setSocket(socket);
        socket.on("getOnlineUsers",(users)=>{
            setOnlineUsers(users);
        });

        return ()=>socket.close();
    }
    else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
    },[authUser]);
    return(
        <SocketContext.Provider value={{socket,onlineUsers}}>{props.children}</SocketContext.Provider>
    )
}

