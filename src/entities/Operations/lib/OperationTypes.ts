export interface IOperation {
    id: number
    itineratyId: number // подгружаем при входе все
    divisionId: number // подгружаем при входе все
    categoryId: number // подгружаем при входе все
    normTime: number
    typeId: number // подгружаем при входе все
    numberPositions: number
    equipmentId?: number // подгружаем при входе все
    isAssigned: boolean
    executorId?: number
    pymentCoefficient?: number
    award?: number
    dateIssue?: Date
    DateExecution?: Date
}