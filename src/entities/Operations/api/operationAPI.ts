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
		return APIJSONRequest<IOperationResponse>(
			`OperationsOfItinerary/by-itinerary/${itineraryId}`,
		)
	},
}
