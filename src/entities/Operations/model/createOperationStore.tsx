import { create, StoreApi, UseBoundStore } from "zustand";
import { IOperation } from "../lib";
import { set } from "react-hook-form";

interface IBaseStore<T> {
    operations: T[];
    setOperations: (operations: T[]) => void;
    addOperations: (operations: T[]) => void;
    removeOperations: (operations: T[]) => void;
}

type WithExtensions<T, E> = IBaseStore<T> & Omit<E, 'operations'>;
// фабрика сторов
const createOperationStore = <T extends { id: number }, E = object>(
    extensions?: (
        set: (
            partial: Partial<WithExtensions<T, E>> | ((state: WithExtensions<T, E>) => Partial<WithExtensions<T, E>>)
        ) => void,
        get: () => WithExtensions<T, E>
    ) => E
): UseBoundStore<StoreApi<WithExtensions<T, E>>> => {

    // Приводим базовые методы стора
    const baseMethods = (
        set: (
            partial: Partial<IBaseStore<T>> | ((state: IBaseStore<T>) => Partial<IBaseStore<T>>)
        ) => void,
        get: () => IBaseStore<T>
    ): IBaseStore<T> => ({
        operations: [],

        setOperations: (operations) => set({ operations }),

        addOperations: (newOperations) =>
            set((state) => {
                const newOperationsIds = new Set(newOperations.map((newOper) => newOper.id));
                const withoutNewOperations = state.operations.filter(
                    (operation) => !newOperationsIds.has(operation.id)
                );

                if (
                    withoutNewOperations.length + newOperations.length ===
                    state.operations.length
                ) {
                    return {};
                }

                return { operations: [...withoutNewOperations, ...newOperations] };
            }),

        removeOperations: (removedOperations) =>
            set((state) => {
                const removedOperationsIds = new Set(removedOperations.map((oper) => oper.id));
                const withoutRemovedOperations = state.operations.filter(
                    (oper) => !removedOperationsIds.has(oper.id)
                );

                if (withoutRemovedOperations.length === state.operations.length) {
                    return {};
                }

                return { operations: withoutRemovedOperations };
            }),
    });

    // Приводим set и get к базовому типу, а то ругается TS
    return create((set, get) => {
        const baseSet = set as (partial: Partial<IBaseStore<T>> | ((state: IBaseStore<T>) => Partial<IBaseStore<T>>)) => void;
        const baseGet = get as () => IBaseStore<T>;

        const base = baseMethods(baseSet, baseGet);
        const ext = extensions ? extensions(set, get) : {};

        return {
            ...base,
            ...ext,
        } as WithExtensions<T, E>;
    }) as UseBoundStore<StoreApi<WithExtensions<T, E>>>;
}



// export const useSelectedOperationsStore = createOperationStore<IOperation, {
//     clearSelected: () => void;
//     getSelectedCount: () => number;
// }>((set, get) => ({
//     clearSelected: () => set({ operations: [] }),
//     getSelectedCount: () => get().operations.length,
// }));
export const useSelectedOperationsStore = createOperationStore<IOperation>();

export const useOperationStore = createOperationStore<IOperation, {
    setIsFormed: (operationsIds: IOperation[]) => void
}>((set, get) => ({
    setIsFormed: (operation) => set(state => {
        const formedOperationIds = operation.map(oper => oper.id)
        const formedOper = operation.map(({ isFormed, ...opertion }) => ({ isFormed: true, ...opertion }))
        const without = state.operations.filter(oper => !formedOperationIds.includes(oper.id))

        return { operations: [...without, ...formedOper] }
    })
}));