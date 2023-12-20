import { Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";

const PrivateRoutes = () => {
    const user = useAppSelector((state) => state.user);
    return user.user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
