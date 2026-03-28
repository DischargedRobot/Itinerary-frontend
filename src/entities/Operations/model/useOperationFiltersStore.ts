import { create } from "zustand";
import { IOperationFilters } from "./useFilteredOperations";

interface IOperationFiltersStore {
    productIds: number[]
    isFormed: boolean 
    filterArgs: () => IOperationFilters
    
    setProducts: (newProductIds: number[]) => void
    setIsFormed: (isFormed: boolean) => void
}


export const useOperationFiltersStore = create<IOperationFiltersStore>((set, get) => ({
    productIds: [1],
    isFormed: false,
    filterArgs: () => ({productIds: get().productIds, isFormed: get().isFormed}),

    setProducts: (productIds) => set({productIds}),
    setIsFormed: (isFormed) => set({isFormed}),
}))