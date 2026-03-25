import { create } from "zustand";
import { IExecutor } from "../lib/ExecutorTypes";

interface ExecutorFilters {
    members: string[]
    isBrigade: boolean
}


interface IExecutorFiltersStore extends ExecutorFilters{
    setFilters: (newFilters: ExecutorFilters) => void
    setMembers: (newMembers: string[]) => void
    setIsBrigade: (newIsBrigade: boolean) => void
}

export const useExecutorFiltersStore = create<IExecutorFiltersStore>(set => ({
    members: [],
    isBrigade: false,
    
    setFilters: (newFilters) => set(newFilters),
    setMembers: (members) => set({members}),
    setIsBrigade: (isBrigade) => set({isBrigade}),
}))