import { create } from "zustand";
import { IOperationFilters } from "./useFilteredOperations";

interface IOperationFiltersStore extends IOperationFilters{
    filterArgs: () => IOperationFilters
    
    setProducts: (newProductIds: number[]) => void
    setIsFormed: (isFormed: boolean) => void
    setFromDate: (dateExecution: NonNullable<IOperationFilters['dateExecution']>['fromDate']) => void
    setToDate: (dateExecution: NonNullable<IOperationFilters['dateExecution']>['toDate']) => void
    setDate: (dateExecution: IOperationFilters['dateExecution']) => void
}


export const useOperationFiltersStore = create<IOperationFiltersStore>((set, get) => ({
    productIds: [1],
    isFormed: false,
    dateExecution: {},

    filterArgs: () => ({productIds: get().productIds, isFormed: get().isFormed, dateExecution: get().dateExecution}),

    setProducts: (productIds) => set({productIds}),
    setIsFormed: (isFormed) => set({isFormed}),
    setFromDate: (fromDate) => set(state => ({dateExecution: {fromDate, toDate: state.dateExecution.toDate}})),
    setToDate: (toDate) => set(state => ({dateExecution: {fromDate: state.dateExecution.fromDate, toDate}})),
    setDate: (dateExecution) => set({dateExecution}),

}))