import { create } from "zustand";
import { IOperationFilters } from "./useFilteredOperations";

interface IOperationFiltersStore {
    productIds: number[]
    isFormed: boolean 
    filterArgs: () => IOperationFilters
    
    setProducts: (newProductIds: number[]) => void
}


export const useOperationFiltersStore = create<IOperationFiltersStore>((set, get) => ({
    productIds: [1],
    isFormed: false,
    filterArgs: () => ({productIds: get().productIds, isFormed: get().isFormed}),

    setProducts: (newProductIds) => set({productIds: newProductIds})
}))