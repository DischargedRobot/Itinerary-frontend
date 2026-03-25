import { IOperation } from "@/entities/Operations"

export interface IExecutor {
    id: number
    members: string[]
    isBrigade: boolean
    department: IDepartment
    operations: IOperation[]
}

export interface IDepartment {
    name: string
    id: number
}