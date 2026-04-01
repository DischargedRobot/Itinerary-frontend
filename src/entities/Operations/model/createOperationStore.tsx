import { create } from "zustand";
import { IOperation } from "../lib";

// Фабрика с готовой логикой
const createOperationStore = <T extends { id: number }>() =>
    create<{
        operations: T[];
        setOperations: (operations: T[]) => void;
        addOperations: (operations: T[]) => void;
        removeOperations: (operations: T[]) => void;
    }>((set) => ({

        operations: [],

        setOperations: (operations) => set({ operations }),

        addOperations: (newOperations) =>
            set((state) => {
                const newOperationsIds = newOperations.map((newOper) => newOper.id)

                const withoutNewOperations = state.operations.filter(
                    (operation) => !newOperationsIds.includes(operation.id))

                if (
                    withoutNewOperations.length + newOperations.length ===
                    state.operations.length
                ) {
                    return {}
                }

                return { operations: [...withoutNewOperations, ...newOperations] }
            }),

        removeOperations: (removedOperations) =>
            set((state) => {
                const removedOperationsIds = removedOperations.map(
                    (oper) => oper.id)

                const withoutRemovedOperations = state.operations.filter(
                    (oper) => !removedOperationsIds.includes(oper.id))

                if (withoutRemovedOperations.length === state.operations.length) {
                    return {}
                }

                return { operations: withoutRemovedOperations }
            }),
    }));

// Создаем сторы
export const useSelectedOperationsStore = createOperationStore<IOperation>();
export const useOperationStore = createOperationStore<IOperation>();