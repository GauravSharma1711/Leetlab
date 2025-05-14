
import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'

import toast from 'react-hot-toast'

export const useAuthStore = create((set)=>({

    authUser :null,
    isSigningUp :false,
    isLoggingIn:false,
    isCheckingAuth:false,

    checkAuth : async()=>{
    set({isCheckingAuth:true})
    try {
        const res  = await axiosInstance.get('/auth/check')
        console.log("check auth res:",res.data);
        set({authUser:res.data.user})
    } catch (error) {
        console.log(error);
        set({authUser:null})
        
    }finally{
         set({isCheckingAuth:false})
    }

    },

    signup:async(data)=>{
         set({isSigningUp:true})
         try {
            
            const res = await axiosInstance.post('/auth/register',data);
            set({authUser:res.data.user});

            toast.success(res.data.message)

         } catch (error) {
            console.log(error);
            toast.error("Error signing Up")
            
         }finally{
            set({isSigningUp:false})
         }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            
            const res = await axiosInstance.post('/auth/login',data);

            set({authUser:res.data.user})

            toast.success(res.data.message);

        } catch (error) {
            console.log(error);
            toast.error("Error logging in",error);
        }finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        try {
    await axiosInstance.delete('/auth/logout');
    set({authUser:null});
    toast.success("LoggedOut Successfully")
  
        } catch (error) {
            console.log("Error loggingo out",error);
            toast.error("Error logging out");
            
            
        }

    }

}))