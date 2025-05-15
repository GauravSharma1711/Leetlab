import {create} from "zustand";
import {axiosInstance} from '../lib/axios.js'

import toast from 'react-hot-toast'

export const useProblemStore = create((set)=>({

    problems:[],
    problem:null,
    solvedProblems:[],
    isProblemsLoading:false,
    isProblemLoading:false,

getAllProblems: async()=>{
    try {
     set({isProblemsLoading:true})
     const res = await axiosInstance.get('/problems/get-all-problems');
          set({problems:res.data.problems})
    } catch (error) {
        console.log("Error getting all problems",error);
        toast.error("Error getting Problems")
    }finally{
        set({isProblemsLoading:false})
    }
},

getProblemById:async(id)=>{
try {
set({isProblemLoading:true})
    const res = await axiosInstance.get(`/problems/get-problem/${id}`);
    set({problem:res.data.problem})
toast.success(res.data.message);
} catch (error) {

    console.log("error gettting problemById",error);
    toast.error("Error While Fetching Problem by id");

}finally{
    set({isProblemLoading:false})
}
},

updateProblem:async(id)=>{
try {
    set({isProblemLoading:true})
    const res  = await axiosInstance.put(`/problems/update-problem/${id}`)
    set({problem:res.data.problem})
    toast.success("Problem updated successsfully")
} catch (error) {
    console.log("error updating problem",error)
    toast.error("Error in updating problem")
}finally{
set({isProblemLoading:false})
}
},


deleteProblem:async(id)=>{
try {
    const res = await axiosInstance.delete(`/problems/delete-problem/${id}`);
    toast.success(res.data.message);
} catch (error) {
    console.log("Error deelting problem",error);
    toast.error("Error deleting problem")
    
}
},

getAllProblemsSolvedByUser:async()=>{
    try {
        const res = await axiosInstance.get('/problems/get-solved-problems')
        set({solvedProblems:res.data.problems})
        toast.success(res.data.message)
    } catch (error) {
        console.log("Error getting problems solved by user",error);
        toast.error("Error getting problems solved by user ")
    }

    
},


}))
