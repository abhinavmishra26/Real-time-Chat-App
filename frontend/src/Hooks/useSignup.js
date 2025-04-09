import {toast} from "react-hot-toast";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
   const {setAuthUser}=useAuth();

    const signup=async({fullname,username,email,password,confirmpassword,gender})=>{
      const success=handleInputErrors({fullname,username,email,password,confirmpassword,gender})
      if(!success) return ;
      setLoading(true);
      try{
        const res=await fetch("/api/auth/register",{
          method:"POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({fullname,username,email,password,gender}),
        });

        // const {data}=await axios.post("/api/auth/register",{fullname,username,email,password,gender});
        const data=await res.json();
        if(data.result==="false"){
          toast.error("Username or email already exists");
        }
        else{
        toast.success("successfully registered");
        localStorage.setItem("chatapp",JSON.stringify(data));
        setAuthUser(data);
        navigate("/login");
        }
      }
      catch(error){
        toast.error(error.message);

      } finally{
        setLoading(false);
      }

    };
    return {loading,signup};
}
export default useSignup;

const handleInputErrors=({fullname,username,email,password,confirmpassword,gender})=>{
    if(!fullname || !username || !email || !password || !gender){
        toast.error("please fill all the required fields");
        return false;
    }
    if(password!==confirmpassword){
      toast.error("Passwords do not match");
      return false;
    }
    if(password.length<6){
        toast.error("Password must be at least 6 characters");
        return false;
    }
    return true;

}