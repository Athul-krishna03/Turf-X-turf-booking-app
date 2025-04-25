import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from '../../store/store';



const useAuth = () => {
    const user = useSelector((state: RootState) => state?.user.user);
    const admin = useSelector((state: RootState) => state?.admin.admin);
    const turf = useSelector((state:RootState)=>state?.turf.turf);

    return { user, admin,turf};
};

export const GuestRoutes = ({ element }: any) => {
    const { user, admin,turf } = useAuth();
    console.log("turf",turf);
    

    if (admin) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }
    if (turf) {
        return <Navigate to="/turf/dashboard" replace />;
    }
    
    return element;
};