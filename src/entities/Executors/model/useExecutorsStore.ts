import { create } from "zustand";
import { IExecutor } from "../lib/ExecutorTypes";
import { mockExecutors } from "@/shared/testData/testData";

interface IExecutorsStore {
    executors: IExecutor[]

    setExecutors: (newExecutors: IExecutor[]) => void
    addExecutor: (newExecutor: IExecutor) => void
    updateExecutor: (newExecutorData: Partial<IExecutor>, executorId: number) => void
}

export const useExecutorsStore = create<IExecutorsStore>(set => ({
    executors: mockExecutors,

    setExecutors: (newExecutors) => set({executors: newExecutors}),

    addExecutor: (newExecutor) => set(state => {
        if (state.executors.find(exec => exec.id === newExecutor.id)) {
            return {}
        }

        return {executors: [...state.executors, newExecutor]}
    }),

    updateExecutor: (newExecutorData, executorId) => set(state => {
        const selectedExec = state.executors.find(exec => exec.id === executorId)
        if (!selectedExec) {
            return {}
        }

        Object.assign(selectedExec, newExecutorData)
        
        return {executors: [...state.executors]}
    }),
    
}))