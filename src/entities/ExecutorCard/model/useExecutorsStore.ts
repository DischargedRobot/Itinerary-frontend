import { create } from "zustand";
import { IExecutor } from "../lib/ExecutorTypes";

interface IExecutorsStore {
    executors: IExecutor[]
    setExecutors: (newExecutors: IExecutor[]) => void

    addExecutor: (newExecutor: IExecutor) => void
}

export const useExecutorsStore = create<IExecutorsStore>(set => ({

}))