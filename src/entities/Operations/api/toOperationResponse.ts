import { IOperation } from "../lib"
import { IOperationResponseWithDatesSting } from "./operationAPI"

const formatDate = (date?: Date): string | undefined => {
	if (!date) return undefined
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const day = String(date.getDate()).padStart(2, "0")
	return `${year}-${month}-${day}`
}

export const toOperationResponse = (
	operation: IOperation,
): IOperationResponseWithDatesSting => ({
	id: operation.id,
	name: operation.name,
	product: operation.product,
	itineraryId: operation.itineraryId,
	departmentId: operation.department.id,
	categoryId: operation.category.id,
	normTime: operation.normTime,
	typeId: operation.type.id,
	numberPositions: operation.numberPositions,
	equipmentId: operation.equipment?.id ?? 0,
	executorId: operation.executor?.id ?? 0,
	paymentCoefficient: operation.paymentCoefficient,
	award: operation.award,
	dateIssue: formatDate(operation.dateIssue) ?? "",
	dateExecution: formatDate(operation.dateExecution) ?? "",
	isFormed: operation.isFormed,
})
