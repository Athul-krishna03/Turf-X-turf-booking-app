import { Route, Routes } from "react-router-dom";
import {ProtectedRoutes} from "../routes/protected/AuthRoutes"
import TurfDashboard from "../pages/Turf/TurfDashboard";


export function TurfRoutes(){
    console.log("inside turf route");
    
    return(
        <Routes>
            <Route
            path="/dashboard"
            element={<ProtectedRoutes allowedRoles={["turfOwner"]} element={<TurfDashboard/>}/>}
            />
        </Routes>
    )
}