import { create } from "zustand";
import { IExecutor } from "../../ExecutorCard/lib/ExecutorTypes";

interface IExecutorsStore {
    executors: IExecutor[]
    setExecutors: (newExecutors: IExecutor[]) => void

    addExecutor: (newExecutor: IExecutor) => void
}

export const useExecutorsStore = create<IExecutorsStore>(set => ({
    executors: [{members: ['sss','ddd','dreee','dfdg'], id: 1, isBrigade: false, department: {id: 1, name: '12'}, operations: []},
        {members: ['sss','ddd','dreee','dfdg'], id: 2, isBrigade: false, department: {id: 1, name: '12'}, operations: []},
        {members: ['sss','ddd','dreee','dfdg'], id: 3, isBrigade: false, department: {id: 1, name: '12'}, operations: []}],
    setExecutors: (newExecutors) => set({executors: newExecutors}),

    addExecutor: (newExecutor) => set(state => {
        if (state.executors.map(exec => exec.id).includes(newExecutor.id)) {
            return {}
        }

        return {executors: [...state.executors, newExecutor]}
    }) 
}))