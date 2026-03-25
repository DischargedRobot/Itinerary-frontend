import { create } from "zustand";

interface IOperationFiltersStore {
    productIds: number[]

    setProducts: (newProductIds: number[]) => void
}


export const useOperationFiltersStore = create<IOperationFiltersStore>(set => ({
    productIds: [1],

    setProducts: (newProductIds) => set({productIds: newProductIds})
}))