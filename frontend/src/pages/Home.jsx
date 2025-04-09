import { MessageContainer } from "../Components/messages/MessageContainer"
import { Sidebar } from "../Components/Sidebar/Sidebar"
export const Home=()=>{
    return(
        <div className=" w-screen h-screen flex justify-center items-center    max-md:justify-normal max-lg:p-8">
            
            <Sidebar/>
            <MessageContainer/>
           
        </div>
    )

}
