import { create } from 'zustand'
import { getUserData, loginRequest, registerRequest } from '@/api/auth'

export const useAuth = create((set) => ({
    user: window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null,
    token: window.localStorage.getItem('token') || null,
    errors: null,
    isAuthenticated: window.localStorage.getItem('token') ? true : false,
    setUser: (user) => {
        set({ user });
        window.localStorage.setItem('user', JSON.stringify(user));
    },
    setToken: (token) => {
        set({ token });
        window.localStorage.setItem('token', token);
    },
    login: async (userLogin) => {
        try {
            const res = await loginRequest(userLogin);
            const resUser = await getUserData(res.data.id);
            set({ user: resUser.data[0] });
            set({ isAuthenticated: true });
            set({ token: res.data.token });
            window.localStorage.setItem('token', res.data.token);
            window.localStorage.setItem('user', JSON.stringify(resUser.data[0]));
        } catch (error) {
            set({ errors: error.response.data  });
            setTimeout(() => set({ errors: null }), 3000);
        }
    },
    register: async (userRegister) => {
        try {
            await registerRequest(userRegister);
            return true;
        } catch (error) {
            set({ errors: error.response.data});
            console.log(error);
            setTimeout(() => set({ errors: null }), 3000);
            return false;
        }
    },
    logout: () => {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
        set({ user: null });
        set({ token: null });
        set({ isAuthenticated: false });
    },
}));
