import { IOperation } from "@/entities/Operations"
import { IDepartment } from "@/shared/lib/types"

export interface IExecutor {
    id: number
    members: string[]
    name: string
    isBrigade: boolean
    department: IDepartment
    operations: IOperation[] | {id: number[]}
}
