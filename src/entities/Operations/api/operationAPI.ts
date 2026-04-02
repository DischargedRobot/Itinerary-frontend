import { IOperation } from "../lib"
import { APIJSONRequest } from "@/shared/api"

type RelationKeys =
	| "itinerary"
	| "department"
	| "category"
	| "type"
	| "equipment"
	| "executor"

export type IOperationResponse = Omit<IOperation, RelationKeys> & {
	[K in RelationKeys as `${K}Id`]: number
}

export const operationAPI = {
	getOperationByExecutorId: async (executorID: number) => {
		return APIJSONRequest<IOperationResponse>(
			`OperationsOfItinerary/by-executor/${executorID}`,
		)
	},

	getOperationsByItineraryId: async (itineraryId: number) => {
		const operations = await APIJSONRequest<IOperationResponse>(
			`OperationsOfItinerary/by-itinerary/${itineraryId}`,
		)

		return operations.map(({ dateIssue, dateExecution, ...operation }) => {
			if (dateExecution)
				return {
					dateIssue: dateIssue ? new Date(dateIssue) : undefined,
					dateExecution: dateExecution
						? new Date(dateExecution)
						: undefined,
					...operation,
				}
		})
	},
}
