import { IOperation } from "@/entities/Operations"

export interface IEquipment {
    id: number
    name: string
    operationTypeId: IOperation['id']
}