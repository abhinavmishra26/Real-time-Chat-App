import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import useConversation from "../../zustand/useConversation";

export const SearchInput = () => {
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);
	const { setSearchUser } = useConversation();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!search.trim()) return;
		if (search.length < 3) return toast.error("Search must be at least 3 characters");

		try {
			setLoading(true);
            const { data } = await axios.get(`/api/user/search?search=${search}`);
			if (!data || data.length === 0) {
				toast.error("No users found");
				setSearchUser([]);
			} else {
				setSearchUser(data);
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to search users");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex justify-center mt-3">
			<input
				type="text"
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-[70%] rounded-3xl h-10 px-4 py-2 bg-gray-900 outline-none text-gray-300 mr-5 mt-2"
			/>
			<button type="submit" disabled={loading} className="btn btn-circle w-11 h-11 bg-blue-400 rounded-full text-white px-3 py-2 mt-1">
				<FaSearch className="w-6 h-6" />
			</button>
		</form>
	);
};



// import axios from "axios";
// import { useState } from "react";
// import toast from "react-hot-toast";
// import { FaSearch } from "react-icons/fa";
// import useConversation from "../../zustand/useConversation";
// import useGetConverations from "../../Hooks/useGetConversations";
// export const SearchInput=()=>{
//     // const [searchInput,setSearchInput]=useState('');
//     // // const [searchUser,setSearchUser]=useState([]);
//     // const {searchUser,setSearchUser} =useConversation();
//     // const [loading,setLoading]=useState(false);

//     // const handleSearchSubmit=async(e)=>{
//     //     e.preventDefault();
//     //     setLoading(true);
//     //     try{
//     //         const {data}=await axios.get(`/api/user/search?search=${searchInput}`);
           
//     //         if(data.success==false){
//     //             setLoading(false);
//     //             console.log(data.message);
//     //         }
//     //         setLoading(false);
//     //         if(data.length===0){
//     //             toast.error("User not found");
//     //         }else{
//     //              setSearchUser(data);
                
//     //         }
        
//     //     }
//     //     catch(error){
//     //         setLoading(false);
//     //         console.log(error.message);
//     //     }
//     // }
//     // console.log("hello",searchUser);

//     const [search, setSearch] = useState("");
// 	const { setSelectedConversation } = useConversation();
// 	const { conversations } = useGetConverations();

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		if (!search) return;
// 		if (search.length < 3) {
// 			return toast.error("Search term must be at least 3 characters long");
// 		}

// 		const conversation = conversations.find((c) => c.fullname.toLowerCase().includes(search.toLowerCase()));

// 		if (conversation) {
// 			setSelectedConversation(conversation);
// 			setSearch("");
// 		} else toast.error("No such user found!");
// 	};

//     return(
//         <form onSubmit={(e)=>handleSubmit(e)} className="flex justify-center mt-3">
//          <input type="text" placeholder="Search.."value={search} onChange={(e)=>setSearch(e.target.value)} className="w-[70%] rounded-3xl h-10 px-4 py-2 bg-gray-900 outline-none text-gray-300 mr-5 mt-2"/>
//          <button type="submit" className=" btn btn-circle w-11 h-11 bg-blue-400 rounded-full text-white px-3 py-2 mt-1"><FaSearch className="w-6 h-6 outline-none " /></button>
//         </form>
//     )
// }


