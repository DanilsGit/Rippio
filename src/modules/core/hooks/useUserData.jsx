import { useAuth } from '@m/core/hooks/useAuth.jsx'
import { getUserData } from '@/api/auth.jsx';
import { useEffect } from 'react';

export const useUserData = () => {
    const user = useAuth((state) => state.user);
    const setUser = useAuth((state) => state.setUser);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    useEffect(() => {
        const updateUserData = async () => {
            if (user && user.id) {
                const newUser = await getUserData(user.id);
                setUser(newUser.data[0]);
            }
        };

        if (isAuthenticated && user) {
            updateUserData();
        }
    }, [isAuthenticated, user, setUser]);
};