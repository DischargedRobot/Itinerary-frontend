import { create } from "zustand";
import { ExecutorFilters } from "./useFilteredExecutor";

interface IExecutorFiltersStore extends ExecutorFilters{
    setFilters: (newFilters: ExecutorFilters) => void
    setMembers: (newMembers: string[]) => void
    setDepartmentId: (newDepartmentId: number | null) => void
    setIsBrigade: (newIsBrigade: boolean) => void
}

export const useExecutorFiltersStore = create<IExecutorFiltersStore>(set => ({
    members: [],
    isBrigade: false,
    departmentId: null,
    
    setFilters: (newFilters) => set(newFilters),
    setMembers: (members) => set({members}),
    setDepartmentId: (departmentId) => set({departmentId}),
    setIsBrigade: (isBrigade) => set({isBrigade}),
}))