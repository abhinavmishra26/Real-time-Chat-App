import { useEffect } from "react";
import { useSocketContext } from "../Context/SocketContext"
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages=()=>{
    const {socket}=useSocketContext();
    const {messages,setMessages}=useConversation();

    useEffect(()=>{
        const handleNewMessage = (newMessage) => {
            newMessage.shouldShake = true;
            const sound=new Audio(notificationSound);
            sound.play();
            setMessages([...messages, newMessage]);
        };
        socket?.on("newMessages", handleNewMessage);

        return () => {
            socket?.off("newMessages", handleNewMessage); // FIX: use the correct event name
        };
    },[socket,setMessages,messages])


}

export default useListenMessages