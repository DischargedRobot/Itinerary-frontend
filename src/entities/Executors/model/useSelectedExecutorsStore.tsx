import { create } from "zustand";
import { IExecutor } from "../lib";

interface ISelectedExecutorsStore {
    selectedExecutors: IExecutor[]
    
    setSelectedExecutors: (newSelectedExecutors: IExecutor[]) => void
    addSelectedExecutor: (newSelectedExecutors: IExecutor) => void
    removeSelectedExecutor: (removedSelectedExecutor: IExecutor) => void
}

export const useSelectedExecutorsStore = create<ISelectedExecutorsStore>((set) => ({
    selectedExecutors: [],

    setSelectedExecutors: (selectedExecutors) => set({selectedExecutors}),

    addSelectedExecutor: (newSelectedExecutor) => set(state => {
        if (state.selectedExecutors.map(exec => exec.id).includes(newSelectedExecutor.id)) {
            return {}
        }

        return {selectedExecutors: [...state.selectedExecutors, newSelectedExecutor]}
    }),

    removeSelectedExecutor: (removedSelectedExecutor) => set(state => {
        console.log([...state.selectedExecutors.filter(exec => exec.id !== removedSelectedExecutor.id)], 'removed')
        return {selectedExecutors: [...state.selectedExecutors.filter(exec => exec.id !== removedSelectedExecutor.id)]}
    })
}))