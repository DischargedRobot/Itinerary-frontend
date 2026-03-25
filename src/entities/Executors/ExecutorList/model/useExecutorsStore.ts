import { create } from "zustand";
import { IExecutor } from "../../ExecutorCard/lib/ExecutorTypes";

interface IExecutorsStore {
    executors: IExecutor[]
    setExecutors: (newExecutors: IExecutor[]) => void

    addExecutor: (newExecutor: IExecutor) => void
}

export const useExecutorsStore = create<IExecutorsStore>(set => ({
    executors: [],
    setExecutors: (newExecutors) => set({executors: newExecutors}),

    addExecutor: (newExecutor) => set(state => {
        if (state.executors.map(exec => exec.id).includes(newExecutor.id)) {
            return {}
        }

        return {executors: [...state.executors, newExecutor]}
    }) 
}))