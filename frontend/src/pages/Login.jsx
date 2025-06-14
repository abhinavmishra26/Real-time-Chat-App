import { useState } from "react"
import axios from "axios";
import toast from "react-hot-toast";
import { FaPassport } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
export const Login=()=>{
    const navigate=useNavigate();
    const {authUser,setAuthUser}=useAuth();
    const [userInput,setUserInput]=useState({
        email:"",
        password:"",
    });

    const [loading,setLoading]=useState(false);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
        
        try{
            if(!userInput.email || !userInput.password){
                throw new Error("Please fill the required details");
            }
            const {data}=await axios.post("/api/auth/login",userInput)
            if(data.success===false){
                setLoading(false);
                toast.error(data.message);
            }
            toast.success(data.message)
            localStorage.setItem("chatapp",JSON.stringify(data));
            setAuthUser(data);
            setLoading(false);
            navigate('/');
        }
        catch (error) {
            setLoading(false);
            if (error.response) {
                console.log("Error response:", error.response.data);
                toast.error(error.response.data.message || "Something went wrong");
            }
            if(error.message){
                toast.error(error.message);
            } 
            else {
                console.log("Unexpected error:", error);
                toast.error("Network error. Please try again.");
            }
        }
    }

    return(
        <div className=" w-screen h-screen  flex flex-col justify-center items-center ">
        <div className=" w-full max-w-sm p-6 rounded-md backdrop-blur-xl bg-opacity-30 bg-zinc-800">        <h1 className="text-center text-3xl  text-white font-semibold">Login <span className="text-blue-400">Chatters</span></h1>
        <form onSubmit={handleSubmit}>
           
            <label className="mt-2 block text-gray-300 text-sm">Email</label>
            <input type="email" placeholder="Email"  value={userInput.email} onChange={(e)=>setUserInput({...userInput,email:e.target.value})}className="mt-2 w-full h-8 px-3 rounded-md  bg-zinc-900 text-gray-300 outline-none" />
            
            <label className="mt-2 block text-gray-300 text-sm">Password</label>
            <input type="password" placeholder="Password"  value={userInput.password} onChange={(e)=>setUserInput({...userInput,password:e.target.value})} className="mt-2 w-full block h-8 px-3 rounded-md  bg-zinc-900 text-gray-300 outline-none"/>
            
            <div className="mt-10 ">
            <p className="text-gray-300 ">Don't have an account ?  <Link to={"/register"}><span className="text-yellow-300 underline">Register</span></Link></p>
            <input type="submit" value="Login" className=" mt-1 w-full rounded-md  bg-zinc-900 h-7 text-white "/>
            </div>
          
        </form>
        </div>
        </div>
    )
}

export default Login