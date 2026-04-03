import { convertOperationsDate } from "../lib"
import { APIJSONRequest } from "@/shared/api"
import { IOperationResponse, IOperationResponseWithDatesSting } from "./operationAPITypes"

export type { IOperationResponse, IOperationResponseWithDatesSting }

export const operationAPI = {
	getOperationByExecutorId: async (executorID: number) => {
		const operations = await APIJSONRequest<IOperationResponseWithDatesSting[]>(
			`OperationsOfItinerary/by-executor/${executorID}`,
		)
		return operations.map(convertOperationsDate)
	},

	getOperationsByItineraryId: async (itineraryId: number) => {
		const operations = await APIJSONRequest<IOperationResponseWithDatesSting[]>(
			`OperationsOfItinerary/by-itinerary/${itineraryId}`,
		)
		return operations.map(convertOperationsDate)
	},

	markOperationsAsFormed: async (operationIds: number[]) => {
		return APIJSONRequest(`OperationsOfItinerary/isFormed`, {
			method: "PUT",
			body: JSON.stringify(operationIds),
		})
	},

	putOperation: async (operation: IOperationResponseWithDatesSting) => {
		return APIJSONRequest(`OperationsOfItinerary/${operation.id}`, {
			method: "PUT",
			body: JSON.stringify(operation),
		})
	},
}
