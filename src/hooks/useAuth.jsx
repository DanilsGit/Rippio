// Importa la función 'create' de la biblioteca 'zustand'
import { create } from 'zustand'
import { getUserData, loginRequest, registerRequest } from '../api/auth'






// Crea un nuevo hook personalizado llamado 'useAuth'
export const useAuth = create((set) => ({
    user: null,
    errors: null,
    isAuthenticated: false,
    setUser: (user) => set({ user }),
    login: async (userLogin) => {
        try {
            const res = await loginRequest(userLogin);
            console.log(res.data);
            const resUser = await getUserData(res.data.id);
            console.log(document.cookie);
            set({ user: resUser.data[0] });
            set({ isAuthenticated: true });
        } catch (error) {
            set({ errors: error.response.data });
            setTimeout(() => set({ errors: null }), 3000);
        }
    },
    register: async (userRegister) => {
        try {
            const res = await registerRequest(userRegister);
            console.log(res);
            set({ user: res });
        } catch (error) {
            set({ errors: error.response.data });
            setTimeout(() => set({ errors: null }), 3000);
        }
    },
    logout: () => set({ user: null, isAuthenticated: false }),
}));