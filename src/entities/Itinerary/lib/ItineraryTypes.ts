import { IOperation } from "@/entities/Operations/lib/OperationTypes"
import { IProduct } from "@/entities/Product"

export interface IItinerary {
	id: number
	product: IProduct
	positionPlanId: number
	audCode: string
	audName: string
	operations: IOperation[] | { id: number }[]
	numberPositions: number
	kit: number
	increasingKit: number
	date: Date
	route: number[] // тут по идеи ID цехов
}

export interface IItineraryWithFullOpearions extends Omit<
	IItinerary,
	"operations"
> {
	operations: IOperation[]
}
