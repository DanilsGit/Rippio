/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom"; 

export function ProtectedUserRoute({ element }) {
    const user = useAuth((state) => state.user);

    if (user.tipo_usuario === 3) {
        return <Navigate to="/profileRestaurant" replace/>;
    }
    if (user.tipo_usuario !== 1) {
        return <Navigate to="/login" replace/>;
    }
    
    return element;
}

export function ProtectedUserOrDefaultRoute({ element }) {
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    if (isAuthenticated && user.tipo_usuario !== 1) {
        return <Navigate to="/" replace/>;
    }
    
    return element;
}