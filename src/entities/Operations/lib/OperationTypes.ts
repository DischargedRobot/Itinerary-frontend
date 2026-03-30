import { IExecutor } from "@/entities/Executors/lib/ExecutorTypes"
import { IItinerary } from "@/entities/Itinerary/lib/ItineraryTypes"
import { IProduct } from "@/entities/Product"
import { ICatergory } from "@/shared"
import { IDepartment } from "@/shared/lib"
import { IEquipment } from "@/shared/lib/types/IEquipment"
import { ITypeOperation } from "@/entities/OperationType/lib/OpertionTypeTypes"

export interface IOperation {
    id: number
    product: IProduct // подгружаем при входе все
    itinerary: IItinerary // подгружаем при входе все
    department: IDepartment // подгружаем при входе все
    category: ICatergory // подгружаем при входе все
    normTime: number
    type: ITypeOperation // подгружаем при входе все
    numberPositions: number
    equipment?: IEquipment // подгружаем при входе все
    isAssigned: boolean
    executor?: IExecutor
    paymentCoefficient?: number
    award?: number
    dateIssue?: Date
    dateExecution?: Date
    isFormed: boolean
}