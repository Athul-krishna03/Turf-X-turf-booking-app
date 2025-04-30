import { Route, Routes } from "react-router-dom";
import {ProtectedRoutes} from "../routes/protected/AuthRoutes"
import TurfXDashboard from "../pages/user/userDashboard";
import Profile from "../pages/user/Profile";
import TurfDetailsPage from "../pages/user/turfDetialsPage";


export function UserRoutes(){
    return(
        <Routes>
            <Route
            path="/"
            element={<ProtectedRoutes allowedRoles={["user"]} element={<TurfXDashboard/>}/>}
            />
            <Route
            path="/user/profile"
            element={<ProtectedRoutes allowedRoles={['user']} element={<Profile/>}/>}
            />
            <Route
            path="/user/turfDetialsPage"
            element={<ProtectedRoutes allowedRoles={['user']} element={<TurfDetailsPage/>}/>}
            />

        </Routes>
    )
}