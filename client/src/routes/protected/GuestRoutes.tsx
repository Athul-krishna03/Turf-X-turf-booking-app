import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from '../../store/store';



const useAuth = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const admin = useSelector((state: RootState) => state.admin.admin);

    return { user, admin };
};

export const GuestRoutes = ({ element }: any) => {
    const { user, admin } = useAuth();

    if (admin) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    if (user) {
        return <Navigate to="/" replace />;
    }
    return element;
};