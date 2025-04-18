import {BrowserRouter,Route,Routes} from "react-router-dom"
import SignUp  from "./pages/user/signup"
import Login from "./pages/user/login"
import AdminLogin from "./pages/admin/AdminLogin"
import { GuestRoutes } from "./routes/protected/GuestRoutes"
import { UserRoutes } from "./routes/ClientRoutes"
import { AdminRoutes } from "./routes/AdminRoutes"
import TurfRegistrationForm from "./pages/Turf/TurfRegistration"
import TurfLoginPage from "./pages/Turf/TurfLogin"


export default function App(){
  return (

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<GuestRoutes element={<SignUp/>} />}/>
      <Route path="/login" element={<GuestRoutes element={<Login/>} />}/>
      
      {/* User Routes */}
      <Route path="/*" element={<UserRoutes/>}/>
      
      {/* Turf Routes */}
      <Route path="/turf/signup" element={<TurfRegistrationForm/>}/>
    
      <Route path="/turf/login" element={<TurfLoginPage/>}/>

      {/* Admin Routes */}
      <Route path="/admin/login" element={<GuestRoutes element={<AdminLogin/>}/>}/>
      <Route path="/admin/*" element={<AdminRoutes/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}