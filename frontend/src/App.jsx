import { Route,Routes } from "react-router-dom"
import { Signup} from "./pages/Signup"
import {Login} from "./pages/Login"
import {Home} from "./pages/Home"
import { Toaster } from "react-hot-toast"
import { VerifyUser } from "./utils/VerifyUser"
function App() {
  return(
    <div >
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Signup/>}/>
      <Route element={<VerifyUser/>}>
          <Route path="/" element={<Home/>}/>
      </Route>
    </Routes>
    <Toaster/>
    </div>
  )
 
}

export default App
