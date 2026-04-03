import { IExecutor } from "@/entities/Executors/lib/ExecutorTypes"
import { IItinerary } from "@/entities/Itinerary/lib/ItineraryTypes"
import { IProduct } from "@/entities/Product"
import { ICatergory } from "@/shared"
import { IDepartment } from "@/shared/lib"
import { IEquipment } from "@/shared/lib/types/IEquipment"
import { ITypeOperation } from "@/entities/OperationType/lib/OpertionTypeTypes"

export interface IOperation {
	id: number
	name: string
	product: IProduct // подгружаем при входе все
	itineraryId: number // подгружаем при входе все
	department: IDepartment // подгружаем при входе все
	category: ICatergory // подгружаем при входе все
	normTime: number
	type: ITypeOperation // подгружаем при входе все
	numberPositions: number
	equipment?: IEquipment // подгружаем при входе все
	// isAssigned: boolean
	executor?: IExecutor
	paymentCoefficient?: number
	award?: number
	dateIssue?: Date
	dateExecution?: Date
	isFormed: boolean
}

export function isIOperation(obj: unknown): obj is IOperation {
	if (!obj || typeof obj !== "object") {
		return false
	}

	const candidate = obj as Record<string, unknown>

	// cписок обязательных полей
	const requiredFields: (keyof IOperation)[] = [
		"id",
		"product",
		"itineraryId",
		"department",
		"category",
		"normTime",
		"type",
		"numberPositions",
		"isFormed",
	]

	// gроверяем наличие всех обязательных полей
	for (const field of requiredFields) {
		if (candidate[field] === undefined || candidate[field] === null) {
			return false
		}
	}

	return true
}
