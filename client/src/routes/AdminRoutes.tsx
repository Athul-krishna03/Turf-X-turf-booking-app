import { Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./protected/AuthRoutes";
import AdminDashboard from "../pages/admin/AdminDashboard";

export function AdminRoutes(){
    return(
        <Routes>
            <Route
                path="/dashboard"
                element={<ProtectedRoutes allowedRoles={["admin"]} element={<AdminDashboard/>}/>}            
            />
        </Routes>
    )
}