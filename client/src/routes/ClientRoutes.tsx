import { Route, Routes } from "react-router-dom";
import {ProtectedRoutes} from "../routes/protected/AuthRoutes"
import TurfXDashboard from "../pages/user/userDashboard";


export function UserRoutes(){
    return(
        <Routes>
            <Route
            path="/"
            element={<ProtectedRoutes allowedRoles={["user"]} element={<TurfXDashboard/>}/>}
            />
        </Routes>
    )
}