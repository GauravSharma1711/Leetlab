import { create } from "zustand";

import axiosInstance from "../utils/axios.js";


const useProblemStore = create((set)=>({

    problems : [],
    problem :null,
    isProblemsLoading:false,
    isProblemLoading : false





}))