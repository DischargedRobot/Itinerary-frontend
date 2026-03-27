import { create } from "zustand"
import { IOperation } from "../lib"

const createInitial = (): IOperation[] => {

    return Array.from({length: 10}).map((_, index) => {
        return {
            id: index,
            productId: 1,
            itinerary: {    
                id: 1,
                productId: 1,
                positionPlanId: 1,
                audCode: '643',
                audName: '4644',
                operations: [],
                numberPositions: 40,
                kit: 40,
                increasingKit: 150,
                date: new Date,
                route: [1],
            },
            department: {id: index, name: 'sss'},
            categoryId: index,
            normTime: index,
            typeId: index,
            numberPositions: 40,
            equipmentId: index,
            isAssigned: false,
            executorId: index,
            paymentCoefficient: 1.7,
            award: 80,
            dateIssue: new Date,
            dateExecution: new Date,
        }
    })
}

interface IOperationStore {
    operations: IOperation[]

    setOperations: (newOperations: IOperation[]) => void
}

export const useOperationStore = create<IOperationStore>(set => ({

    operations: createInitial(),

    setOperations: (newOperations) => set({operations: newOperations})
    
}))