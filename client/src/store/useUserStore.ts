import { create } from "zustand";
import { createJSONStorage,persist } from "zustand/middleware";
import axios from "axios";
import {  LoginInputState, SignupInputState } from "@/schema/userSchema";
import { toast } from "sonner";

const API_END_POINT = "http://localhost:3000/api/v1/user"
axios.defaults.withCredentials = true;
type User = {
    fullname:string;
    email:string;
    contact:number;
    address:string;
    city:string;
    country:string;
    profilePicture:string;
    admin:boolean;
    isVerified:boolean;
}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input:SignupInputState) => Promise<void>;
    login: (input:LoginInputState) => Promise<void>;
    
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;

    
    updateProfile: (input:any) => Promise<void>; 
}

export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,
    // signup api implementation
    signup: async (input: SignupInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) { 
                toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true });
                
            } else {
                toast.error("Signup failed.");
                
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            set({ loading: false }); 
        }
    },
    login:async(input:LoginInputState)=>{
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) { 
                toast.success(response.data.message);
                set({ user: response.data.user, isAuthenticated: true });
            
            } else {
                toast.error("login failed.");
                
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            set({ loading: false }); 
        }
    },
  
    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(`${API_END_POINT}/check-auth`);
            if (response.data.success) {
                set({user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({isAuthenticated: false, isCheckingAuth: false });
        }
    },
    logout:async()=>{
        try {
            set({loading:true});
            const response=await axios.post(`${API_END_POINT}/logout`)
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: null, isAuthenticated: false })
            }
        } catch (error:any) {
            toast.error(error.response?.data.message|| "An error occurred.");
            set({ loading: false });
        }finally{
            set({ loading: false });
        }
    },

    updateProfile: async (input:any) => {
        try { 
            const response = await axios.put(`${API_END_POINT}/profile/update`, input,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.data.success){
                toast.success(response.data.message);
                set({user:response.data.user, isAuthenticated:true});
            }
        } catch (error:any) { 
            toast.error(error.response.data.message);
        }
    }
}),
{
    name: 'user-name',
    storage: createJSONStorage(() => localStorage),
}

)


);


