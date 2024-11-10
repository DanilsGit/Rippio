/* eslint-disable react/prop-types */
import { useAuth } from "@m/core/hooks/useAuth";
import { Navigate } from "react-router-dom";


export function OnlyClientLoginRoute({ element }) {
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user?.tipo_usuario === 2) {
        return <Navigate to="/adminProfile" />;
    }

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    return element;
}

export function OnlyClientNoLoginRoute({ element }) {
    const user = useAuth((state) => state.user);

    if (user?.tipo_usuario === 2) {
        return <Navigate to="/adminProfile" />;
    }
    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    return element;
}

export function OnlyRestaurantLoginRoute({ element }) {
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user?.tipo_usuario === 1) {
        return <Navigate to="/profile" />;
    }

    if (user?.tipo_usuario === 2) {
        return <Navigate to="/adminProfile" />;
    }

    return element;
}

export function OnlyAdminLoginRoute({ element }) {
    const user = useAuth((state) => state.user);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (user?.tipo_usuario === 1) {
        return <Navigate to="/profile" />;
    }

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    return element;
}

export function ProtectedRegisterRoute({ element }) {
    const user = useAuth((state) => state.user);
    const white = window.localStorage.getItem('white') == 'true';
    const logout = useAuth((state) => state.logout);

    if (!white) {
        window.localStorage.clear();
        window.localStorage.setItem('white', 'true');
        window.localStorage.setItem('fix6', 'true');
        logout();
    }


    if (user?.tipo_usuario === 1) {
        return <Navigate to="/profile" />;
    }

    if (user?.tipo_usuario === 3) {
        return <Navigate to="/restaurantprofile" />;
    }

    if (user?.tipo_usuario === 2) {
        return <Navigate to="/adminProfile" />;
    }

    return element;
}