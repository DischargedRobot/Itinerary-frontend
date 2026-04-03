import { IOperation } from "../lib"

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
