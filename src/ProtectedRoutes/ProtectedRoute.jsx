/* eslint-disable react/prop-types */
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom"; 

export function ProtectedProfileRoute({ element }) {
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);
    
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (isAuthenticated && user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    return element;
}

export function ProtectedSearchRoute({ element }) {
    const user = useAuth((state) => state.user);

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    return element;
}


export function ProtectedRegisterRoute({ element }) {
    const user = useAuth((state) => state.user);

    if (user?.tipo_usuario === 1) {
        return <Navigate to="/profile" />;
    }

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }
    
    return element;
}


