export interface IExecutor {
    id: number
    members: string[]
    isBrigade: boolean
    department: IDepartment
}

export interface IDepartment {
    name: string
    id: number
}