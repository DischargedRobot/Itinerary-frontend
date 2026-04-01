import { create } from "zustand"
import { IOperation } from "../lib"

// const createInitial = (): IOperation[] => {

//     return Array.from({length: 10}).map((_, index) => {
//         return {
//             id: index,
//             productId: 1,
//             itinerary: {
//                 id: 1,
//                 productId: 1,
//                 positionPlanId: 1,
//                 audCode: '643',
//                 audName: '4644',
//                 operations: [],
//                 numberPositions: 40,
//                 kit: 40,
//                 increasingKit: 150,
//                 date: new Date,
//                 route: [1],
//             },
//             department: {id: index, name: 'sss'},
//             categoryId: index,
//             normTime: index,
//             typeId: index,
//             numberPositions: 40,
//             equipmentId: index,
//             isAssigned: false,
//             executorId: index,
//             paymentCoefficient: 1.7,
//             award: 80,
//             dateIssue: new Date,
//             dateExecution: new Date,
//         }
//     })
// }

interface IOperationStore {
	operations: IOperation[]

	setOperations: (newOperations: IOperation[]) => void
	addOperations: (newOperations: IOperation[]) => void
	removeOperations: (removedOperations: IOperation[]) => void
}

export const useOperationStore = create<IOperationStore>((set) => ({
	operations: [],

	setOperations: (operations) => set({ operations }),

	addOperations: (newOperations) =>
		set((state) => {
			const newOperationsIds = newOperations.map((newOper) => newOper.id)
			const withoutNewOperations = state.operations.filter(
				(operation) => !newOperationsIds.includes(operation.id),
			)
			console.log(
				newOperations,
				"newOperations",
				state.operations,
				withoutNewOperations,
			)
			if (
				withoutNewOperations.length + newOperations.length ===
				state.operations.length
			) {
				console.log(
					withoutNewOperations,
					"newOperationsIdsInCurrentState",
				)
				return {}
			}

			return { operations: [...withoutNewOperations, ...newOperations] }
		}),

	removeOperations: (removedOperations) =>
		set((state) => {
			const removedOperationsIds = removedOperations.map(
				(oper) => oper.id,
			)
			const withoutRemovedOperations = state.operations.filter(
				(oper) => !removedOperationsIds.includes(oper.id),
			)
			console.log(
				removedOperations,
				"removedOperations",
				state.operations,
			)

			if (withoutRemovedOperations.length === state.operations.length) {
				return {}
			}

			return { operations: withoutRemovedOperations }
		}),
}))
