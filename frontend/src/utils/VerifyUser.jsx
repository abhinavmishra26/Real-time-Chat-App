import { useAuth } from "../Context/AuthContext"
import { Outlet,Navigate } from "react-router-dom";


export const VerifyUser=()=>{
    const {authUser,loading}=useAuth();
    
  if (loading) return <div>Loading...</div>; // Or a spinner
    return(
        authUser? <Outlet/>: <Navigate to={'/login'}/>
    )
}