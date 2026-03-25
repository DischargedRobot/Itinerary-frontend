import { IItinerary } from "@/entities/Itinerary/lib/ItineraryTypes"

export interface IOperation {
    id: number
    productId: number // подгружаем при входе все
    itinerary: IItinerary // подгружаем при входе все
    divisionId: number // подгружаем при входе все
    categoryId: number // подгружаем при входе все
    normTime: number
    typeId: number // подгружаем при входе все
    numberPositions: number
    equipmentId?: number // подгружаем при входе все
    isAssigned: boolean
    executorId?: number
    paymentCoefficient?: number
    award?: number
    dateIssue?: Date
    dateExecution?: Date
}