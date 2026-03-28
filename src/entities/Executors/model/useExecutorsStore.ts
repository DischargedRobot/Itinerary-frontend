import { create } from "zustand";
import { IExecutor } from "../lib/ExecutorTypes";
import { mockExecutors } from "@/shared/testData/testData";

interface IExecutorsStore {
    executors: IExecutor[]
    selectedExecutors: IExecutor[]

    setExecutors: (newExecutors: IExecutor[]) => void
    addExecutor: (newExecutor: IExecutor) => void

    setSelectedExecutors: (newSelectedExecutors: IExecutor[]) => void
    addSelectedExecutor: (newSelectedExecutors: IExecutor) => void
    removeSelectedExecutor: (removedSelectedExecutor: IExecutor) => void
}

export const useExecutorsStore = create<IExecutorsStore>(set => ({
    executors: mockExecutors,

    setExecutors: (newExecutors) => set({executors: newExecutors}),

    addExecutor: (newExecutor) => set(state => {
        if (state.executors.map(exec => exec.id).includes(newExecutor.id)) {
            return {}
        }

        return {executors: [...state.executors, newExecutor]}
    }),

    // ** Selected **//
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