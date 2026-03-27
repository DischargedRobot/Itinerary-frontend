import { IOperation } from "@/entities/Operations/lib/OperationTypes"
import { IProduct } from "@/entities/Product"

export interface IItinerary {
    id: number
    product: IProduct
    positionPlanId: number
    audCode: string
    audName: string
    operations: IOperation[]
    numberPositions: number
    kit: number
    increasingKit: number
    date: Date
    route: number[] // тут по идеи ID цехов
}
