import { createContext, useContext, useState ,useEffect} from "react";

export const AuthContext=createContext();

export const useAuth=()=>{
    return useContext(AuthContext);
}

export const AuthContextProvider=(props)=>{
    const [authUser,setAuthUser]=useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("chatapp"));
    setAuthUser(user || null);
    setLoading(false); // done loading
  }, []);



    return <AuthContext.Provider value={{authUser,setAuthUser, loading}}>{props.children}</AuthContext.Provider>

}