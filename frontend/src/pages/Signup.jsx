import { useState } from "react"
import { Link } from "react-router-dom"
import { GenderCheckbox } from "./GenderCheckbox";
import useSignup from "../Hooks/useSignup";
export const Signup=()=>{
   const [inputs,setInputs]=useState({
    fullname:"",
    username:"",
    email:"",
    password:"",
    confirmpassword:"",
    gender:"",
   });
   const {loading ,signup}=useSignup();

   const handleInputSubmit= async (e)=>{
    e.preventDefault();
    await signup(inputs);
   }
   
   function  handleCheckboxChange(gender){
    setInputs({...inputs,gender:gender})
   }


    return(
        <div className=" w-screen h-screen  flex flex-col justify-center items-center">
        <div className=" w-full max-w-sm h-[65%] p-6 rounded-md backdrop-blur-xl">
        <h1 className="text-center text-3xl  text-white font-semibold">Signup <span className="text-blue-400">Chatters</span></h1>
        <form onSubmit={handleInputSubmit}>
           
            <label className="mt-2 block text-gray-300 text-sm">Full Name</label>
            <input type="text" placeholder="Fullname" value={inputs.fullname} onChange={(e)=>setInputs({...inputs,fullname:e.target.value})} className="mt-2 block w-full h-8 px-3 rounded-md bg-zinc-900 text-gray-300 outline-none" />
            
          
            <label className="mt-2 block text-gray-300 text-sm">Username</label>
            <input type="text" placeholder="Username" value={inputs.username} onChange={((e)=>setInputs({...inputs,username:e.target.value}))} className="mt-2 w-full h-8 px-3 rounded-md  bg-zinc-900 text-gray-300 outline-none"  />
            
            <label className="mt-2 block text-gray-300 text-sm">Email</label>
            <input type="email" placeholder="Email" value={inputs.email} onChange={((e)=>setInputs({...inputs,email:e.target.value})) }className="mt-2 w-full h-8 px-3 rounded-md  bg-zinc-900 text-gray-300 outline-none" />
            
            <label className="mt-2 block text-gray-300 text-sm">Password</label>
            <input type="password" placeholder="Password" value={inputs.password} onChange={(e)=>setInputs({...inputs,password:e.target.value})} className="mt-2 w-full block h-8 px-3 rounded-md  bg-zinc-900 text-gray-300 outline-none"/>

            <label className="mt-2 block text-gray-300 text-sm">Confirm Password</label>
            <input type="password" placeholder="Password" value={inputs.confirmpassword} onChange={(e)=>setInputs({...inputs,confirmpassword:e.target.value})} className="mt-2 w-full block h-8 px-3 rounded-md  bg-zinc-900 text-gray-300 outline-none"/>
            
            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

            <div className="mt-4">
            <p className="text-gray-300 ">Already have an account ?  <Link to={"/login"}><span className="text-yellow-300 underline">Login</span></Link></p>
            <input type="submit" value="Register" className=" mt-1 w-full rounded-md  bg-zinc-900 h-7 text-white "/>
            </div>
          
        </form>
        </div>
        </div>
    )

}

