import { BiLogOut } from "react-icons/bi";
import { useLogout } from "../../Hooks/useLogout";

export const LogoutButton=()=>{


    const {loading,logout} =useLogout();
    return(
        <div>
            <div className="absolute bottom-3 mx-6 transform -translate-x-1/2">
                {!loading ? (
                    <BiLogOut className="w-8 h-8 cursor-pointer text-black"  onClick={logout}/>
                ):(
                    <span className="loading loading-spinner"></span>
                )
                }
            </div>
        </div>
    )
}