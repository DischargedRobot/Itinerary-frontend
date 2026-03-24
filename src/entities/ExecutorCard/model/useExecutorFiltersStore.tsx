import { create } from "zustand";
import { IExecutor } from "../lib/ExecutorTypes";

interface ExecutorFilters {
    members: string[]
    isBrigade: boolean
}


interface IExecutorFiltersStore extends ExecutorFilters{
    setFilters: () => void
    setMembers: () => void
}

export const useExecutorFiltersStore = create<IExecutorFiltersStore>(set => ({
    members: [],
    isBrigade: false,
    
    setFilters: () => {
        
    },

    setMembers: () => {
        
    },
}))