import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Navigate, useLocation } from "react-router-dom";


interface ProtectedRoutesProps{
    element:React.ReactNode;
    allowedRoles:string[];
}

const useAuth=()=>{
    const user = useSelector((state:RootState)=>state?.user.user);
    const admin = useSelector((state:RootState)=>state?.admin.admin);
    const turf = useSelector((state:RootState)=>state?.turf.turf)

    return {user,admin,turf};
}

export const ProtectedRoutes:React.FC<ProtectedRoutesProps> = ({element,allowedRoles})=>{
    const {user,admin,turf}=useAuth();
    const location = useLocation();

    if(!user && !admin){
        if(location.pathname.startsWith("/admin")){
            return <Navigate to="/admin/login" replace />;
        }
        return <Navigate to="/login" replace />
    }

    if (admin) {
        if (!location.pathname.startsWith("/admin")) {
            return <Navigate to="/admin/dashboard" replace />;
        }
        if (location.pathname === "/admin/login") {
            return <Navigate to="/admin/dashboard" replace />;
        }
        if (!allowedRoles.includes("admin")) {
            return <Navigate to="/admin/unauthorized" replace />;
        }
    }
    if (turf) {
        if (!location.pathname.startsWith("/turf")) {
            return <Navigate to="/turf/dashboard" replace />;
        }
        if (location.pathname === "/turf/login") {
            return <Navigate to="/turf/dashboard" replace />;
        }
        if (!allowedRoles.includes("turf")) {
            return <Navigate to="/turf/unauthorized" replace />;
        }
    }

    if (user) {
        if (location.pathname.startsWith("/admin")) {
            return <Navigate to="/unauthorized" replace />;
        }
    
        if (location.pathname === "/login" || location.pathname === "/signup") {
            return <Navigate to="/" replace />;
        }
    
        if (!allowedRoles.includes("user")) {
            return <Navigate to="/unauthorized" replace />;
        }
    }

    return <>{element}</>
}
