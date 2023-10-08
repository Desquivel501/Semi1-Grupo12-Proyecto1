import { Navigate, Outlet } from "react-router-dom";
import { useSesion } from "../../hooks/useSession";

export function ControlLogin() {
    const { user } = useSesion();
    if (user.id == "") {
        return <Navigate to="/Login" />;
    }
    return <Outlet />;
}

export function ControlType() {
    const { user } = useSesion();
    if (user.type != 0) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}

