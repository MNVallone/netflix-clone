import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand";

export const useAuthStore = create((set) => ({
    user:null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isLoginOut: false,
    signup: async (credentials) => {
        set({ isSigningUp:true });
        try {
            const response = await axios.post("/api/v1/auth/signup", credentials);
            set({ user: response.data.user, isSigningUp: false });
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message || "An error ocurred");
            set({ isSigningUp:false, user:null });
        }
    },
    login: async (credentials) => {
        set({ isLoggingIn:true });
        try {
            const response = await axios.post("/api/v1/auth/login", credentials);
            set({ user: response.data.user, isLoggingIn: false });
            toast.success("Loged in successfully");
        } catch (error) {
            toast.error(error.response.data.message || "An error ocurred");
            set({ isLoggingIn:false, user:null });
        }
    },
    logout: async () => {
        set({isLoginOut: true});
        try {
            await axios.post("/api/v1/auth/logout");
            set({user:null, isLoginOut: false});
            toast.success("Logged out succesfully");
        } catch(error){
            set({isLoginOut: false});
            toast.error(error.response.data.message || "Logout failed");
        }
    },
    authCheck: async () => {
        set({isCheckingAuth: true});
        try {
            const response = await axios.get("/api/v1/auth/authCheck");
            
            set({isCheckingAuth: false, user:response.data.user})
        } catch (error){
            set({ isCheckingAuth: false });

        }
    },
}))