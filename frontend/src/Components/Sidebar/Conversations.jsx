import useGetConverations from "../../Hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emoji";
import useConversation from "../../zustand/useConversation";
import { Conversation } from "./Conversation";

export const Conversations = () => {
	const { loading, conversations } = useGetConverations();
	const { searchUser } = useConversation();

	const isSearching = searchUser && searchUser.length > 0;
	const dataToShow = isSearching ? searchUser : conversations;

	return (
		<div className="py-2 h-[76%] flex flex-col overflow-auto">
			{dataToShow.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === dataToShow.length - 1}
				/>
			))}
			{loading && <span className="loading loading-spinner mx-auto"></span>}
		</div>
	);
};




// import useGetConverations from "../../Hooks/useGetConversations"
// import { getRandomEmoji } from "../../utils/emoji";
// import useConversation from "../../zustand/useConversation";
// import { Conversation } from "./Conversation"

// export const Conversations=()=>{
//     const {loading,conversations}=useGetConverations();
//     const {searchUser}=useConversation();
    
//     return( 
//         <div className="py-2 h-[76%] flex flex-col overflow-auto">

           
//           { conversations.map((conversation,idx) => (
//             <Conversation key={conversation._id}
//             conversation={conversation}
//             emoji={getRandomEmoji()}
//             lastIdx={idx===conversations.length-1}
//             />
//              ) )}
           
//             {loading ? <span className="loading loading-spinner mx-auto"></span>:null}
//         </div>
//     )
// }



