import { IOperation } from "@/entities/Operations/lib/OperationTypes"

export interface IItinerary {
    id: number
    productId: number
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
