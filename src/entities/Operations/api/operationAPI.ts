import { IOperation } from "../lib"
import { APIJSONRequest } from "@/shared/api"

type RelationKeys =
	| "itinerary"
	| "department"
	| "category"
	| "type"
	| "equipment"
	| "executor"

type IOperationResponse = Omit<IOperation, RelationKeys> & {
	[K in RelationKeys as `${K}Id`]: number
}

export const operationAPI = {
	getOperationByExecutorId: (executorID: number) => {
		const response = APIJSONRequest<IOperationResponse>(
			`OperationsOfItinerary/by-executor/${executorID}`,
		)
		return response
	},
}
