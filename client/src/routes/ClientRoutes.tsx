import { Route, Routes } from "react-router-dom";
import {ProtectedRoutes} from "../routes/protected/AuthRoutes"
import TurfXDashboard from "../pages/user/userDashboard";
import Profile from "../pages/user/Profile";
import TurfDetailsPage from "../pages/user/turfDetialsPage";
import BookingsPage from "../pages/user/bookingPage";
import HostGamePage from "../pages/user/hostGame";
import HostedGamesPage from "../pages/user/hosted-game";


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
            path="/user/turfDetialsPage/:turfId"
            element={<ProtectedRoutes allowedRoles={['user']} element={<TurfDetailsPage/>}/>}
            />
            <Route
            path="/user/bookings"
            element={<ProtectedRoutes allowedRoles={['user']} element={<BookingsPage/>}/>}
            />
            <Route
            path="/user/hostGame/:slotId"
            element={<ProtectedRoutes allowedRoles={['user']} element={<HostGamePage/>}/>}
            />
            <Route
            path="/user/hostedGames"
            element={<ProtectedRoutes allowedRoles={['user']} element={<HostedGamesPage/>}/>}/>


        </Routes>
    )
}