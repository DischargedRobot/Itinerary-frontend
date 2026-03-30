import { ITypeOperation } from "@/entities/OperationType"

export interface IEquipment {
    id: number
    name: string
    operationType: ITypeOperation
}