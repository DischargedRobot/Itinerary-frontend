import { DatePickerProps } from "antd"
import { IOperation } from "../lib"
import { APIJSONRequest } from "@/shared/api"

type RelationKeys =
	| "itinerary"
	| "department"
	| "category"
	| "type"
	| "equipment"
	| "executor"

export type IOperationResponse = Omit<
	IOperation,
	RelationKeys | "dateIssue" | "dateExecution"
> & {
	[K in RelationKeys as `${K}Id`]: number
} & {
	dateIssue?: Date
	dateExecution?: Date
}

export type IOperationResponseWithDatesSting = Omit<
	IOperation,
	RelationKeys | "dateIssue" | "dateExecution"
> & {
	[K in RelationKeys as `${K}Id`]: number
} & {
	dateIssue?: string
	dateExecution?: string
}

export const operationAPI = {
	getOperationByExecutorId: async (executorID: number) => {
		return APIJSONRequest<IOperationResponse>(
			`OperationsOfItinerary/by-executor/${executorID}`,
		)
	},

	getOperationsByItineraryId: async (itineraryId: number) => {
		const operations = await APIJSONRequest<
			IOperationResponseWithDatesSting[]
		>(`OperationsOfItinerary/by-itinerary/${itineraryId}`)

		return operations.map<IOperationResponse>(
			({ dateIssue, dateExecution, ...operation }) => {
				return {
					dateIssue: dateIssue ? new Date(dateIssue) : undefined,
					dateExecution: dateExecution
						? new Date(dateExecution)
						: undefined,
					...operation,
				}
			},
		)
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
