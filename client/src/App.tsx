import {BrowserRouter,Route,Routes} from "react-router-dom"
import SignUp  from "./pages/user/signup"
import Login from "./pages/user/login"
import TurfXDashboard from "./pages/user/userDashboard"
import AdminLogin from "./pages/admin/AdminLogin"
import AdminDashboard from "./pages/admin/AdminDashboard"
import { GuestRoutes } from "./routes/protected/GuestRoutes"
import { UserRoutes } from "./routes/ClientRoutes"


export default function App(){
  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<GuestRoutes element={<SignUp/>} />}/>
      <Route path="/login" element={<Login/>} />
      
      {/* User Routes */}
      <Route path="/*" element={<UserRoutes/>}/>


      <Route path="/admin/login" element={<AdminLogin/>}/>
      <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}