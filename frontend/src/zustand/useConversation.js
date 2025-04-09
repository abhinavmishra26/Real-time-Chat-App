import {create} from "zustand";

const useConversation=create((set)=>({
    selectedConversation:null,
    setSelectedConversation:(selectedConversation)=>set({selectedConversation}),
    messages:[],
    setMessages:(messages)=>set({messages}),
    searchUser:[],
    setSearchUser: (users) => set({ searchUser: users }),
    
}))

export default useConversation;


// import { create } from "zustand";

// const useConversation = create((set) => ({
// 	selectedConversation: null,
// 	setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
// 	searchUser: [],
// 	setSearchUser: (users) => set({ searchUser: users }),
// }));

// export default useConversation;