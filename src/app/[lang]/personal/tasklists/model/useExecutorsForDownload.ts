import { useMemo } from "react"
import { useSelectedOperationsStore } from "@/entities/Operations/model"
import { IOperation } from "@/entities/Operations/lib/OperationTypes"

interface ExecutorForDownload {
	id: number
	products: {
		id: number
		itineraries: {
			id: number
			operations: {
				id: number
			}[]
		}[]
	}[]
}

type ExecutorMap = Map<
	number,
	{
		id: number
		products: Map<
			number,
			{
				id: number
				itineraries: Map<
					number,
					{
						id: number
						operations: { id: number }[]
					}
				>
			}
		>
	}
>

const groupOperationsByExecutor = (
	executorMap: ExecutorMap,
	operations: IOperation[],
): void => {
	operations.forEach((operation: IOperation) => {
		const executorId = operation.executor?.id

		if (executorId) {
			// Создаём или получаем данные исполнителя
			let executorData = executorMap.get(executorId)
			if (!executorData) {
				executorData = {
					id: executorId,
					products: new Map(),
				}
				executorMap.set(executorId, executorData)
			}

			const productId = operation.product.id

			// Создаём или получаем данные продукта
			let productData = executorData.products.get(productId)
			if (!productData) {
				productData = {
					id: productId,
					itineraries: new Map(),
				}
				executorData.products.set(productId, productData)
			}

			const itineraryId = operation.itineraryId

			// Создаём или получаем данные маршрута
			let itineraryData = productData.itineraries.get(itineraryId)
			if (!itineraryData) {
				itineraryData = {
					id: itineraryId,
					operations: [],
				}
				productData.itineraries.set(itineraryId, itineraryData)
			}

			// Добавляем операцию
			itineraryData.operations.push({
				id: operation.id,
			})
		}
	})
}

export const useExecutorsForDownload = () => {
	const { operations: selectedOperations } = useSelectedOperationsStore()

	const executorsForDownload = useMemo((): ExecutorForDownload[] => {
		// Берём только сформированные операции
		const formedOperations = selectedOperations.filter(
			(op: IOperation) => op.isFormed,
		)

		if (formedOperations.length === 0) return []

		// Группируем операции по исполнителям, продуктам и маршрутам
		const executorMap: ExecutorMap = new Map()
		groupOperationsByExecutor(executorMap, formedOperations)

		// Преобразуем Map в нужный формат
		return Array.from(executorMap.values()).map((executor) => ({
			id: executor.id,
			products: Array.from(executor.products.values()).map((product) => ({
				id: product.id,
				itineraries: Array.from(product.itineraries.values()),
			})),
		}))
	}, [selectedOperations])

	const hasFormedOperations = useMemo(() => {
		return selectedOperations.some((op: IOperation) => op.isFormed)
	}, [selectedOperations])

	return { executorsForDownload, hasFormedOperations }
}
