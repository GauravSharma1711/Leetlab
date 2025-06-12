
import {create} from 'zustand'
import toast from 'react-hot-toast'

import { axiosInstance } from '../lib/axios.js'


export const useAuthStore  = create((set)=>({

    authUser : null,
    isSigninUp : false,
     isLoggingIn:false,
     isCheckingAuth:false,

     checkAuth : async () =>{
        set({isCheckingAuth:true})
        try {
            const res = await axiosInstance.get('/auth/check')
            console.log("check auth data:" , res.data);
            set({authUser:res.data.user})
        } catch (error) {
            console.log("Error checking auth",error);
            set({authUser:null});
        }finally{
            set({isCheckingAuth:false})
        }
     },

     signUp : async (data)=>{
        set({isSigninUp:true})
        try {
            const res = await axiosInstance.post('/auth/register',data);
            set({authUser:res.data.user})
            toast.success(res.data.message);
        } catch (error) {
            console.log(" error signinig Up",error);
            toast.error("Error Signing Up");
        }finally{
      set({isSigninUp:false})
        }
     },

     login : async (data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post('/auth/login',data);
            set({authUser:res.data.user});
            toast.success(res.data.message)
        } catch (error) {
        console.log(" error Logging in",error);
            toast.error("Error Logging in");
        }finally{
      set({isLoggingIn:false})
        }
     },

     logout:  async ()=>{
      try {
        const res =  await axiosInstance.delete('/auth/logout');
        set({authUser:null})
        toast.success(res.data.message);
      } catch (error) {
        console.log("Error logging out",error);
        toast.error("Error logging out");
        
      }
     }



}))