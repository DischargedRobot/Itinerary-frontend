import { create } from "zustand";
import { ITypeOperation } from "../lib";

interface IOperationTypeStore {
    operationTypes: ITypeOperation[]

    setOperationsTypes: (newOperationTypes: ITypeOperation[]) => void
}

export const useOperationTypeStore = create<IOperationTypeStore>(set => ({
    operationTypes: [],
    setOperationsTypes: (operationTypes) => set({operationTypes})
})) 