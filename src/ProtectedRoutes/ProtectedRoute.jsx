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
    const fix = window.localStorage.getItem('white') == 'true';
    const logout = useAuth((state) => state.logout);

    if (!fix) {
        window.localStorage.clear();
        window.localStorage.setItem('white', 'true');
        logout();
    }
    

    if (user?.tipo_usuario === 1) {
        return <Navigate to="/profile" />;
    }

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    return element;
}


export function ProtectedProfileRestaurantRoute({ element }) {
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    if (user?.tipo_usuario === 1) {
        return <Navigate to="/profile" />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return element;
}

export function ProtectedPrincipalPageRestaurantRoute({ element }) {
    const user = useAuth((state) => state.user);

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    return element;
}

export function ProtectedCheckoutRoute({ element }) {
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return element;
}