import { Conversations } from "./Conversations"
import { SearchInput } from "./SearchInput"
import { LogoutButton } from "./LogoutButton"
export const Sidebar=()=>{
   return(
    <div className="w-[320px] h-[75%]  backdrop-blur-xl rounded-md  max-lg:w-[280px] max-lg:h-[70%] ">
        <SearchInput/>
        <div className="divider px-3"></div>
        <Conversations/>
        <LogoutButton/>

    </div>

    )
}