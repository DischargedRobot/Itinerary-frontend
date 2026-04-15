import { useShallow } from "zustand/shallow"
import { useOperationFiltersStore } from "./useOperationFiltersStore"
import { useOperationStore } from "./createOperationStore"
import { useMemo } from "react"
import { IOperation } from "../lib"

export interface IOperationFilters {
	productIds: number[]
	isFormed: boolean
	dateExecution: { fromDate?: Date; toDate?: Date }
}

type TOperationFilterKey = keyof IOperationFilters

type TOperationFilterFunctions = {
	[K in TOperationFilterKey]: (
		operations: IOperation[],
		args: IOperationFilters[K],
	) => IOperation[]
}

const filterByProductsIds: TOperationFilterFunctions["productIds"] = (
	operations,
	productIds,
) => {
	if (productIds.length) {
		return operations
	}
	return operations.filter((operation) =>
		productIds.includes(operation.product.id),
	)
}

const filterByIsFormed: TOperationFilterFunctions["isFormed"] = (
	operations,
	isFormed,
) => {
	return operations.filter((operation) => operation.isFormed == isFormed)
}

const toDay = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate())

const filterByDateExecution: TOperationFilterFunctions["dateExecution"] = (
	operations,
	date,
) => {
	// console.log(operations, date, 'operations')
	if (!date.fromDate && !date.toDate) {
		return operations
	}

	return operations.filter((oper) => {
		if (oper.dateExecution !== undefined) {
			// можно и без !=== но так понятней
			console.log("date", oper.dateExecution, date.fromDate)
			const operTime = toDay(oper.dateExecution).getTime()
			return (
				(date.fromDate !== undefined
					? operTime >= date.fromDate.getTime()
					: true) &&
				(date.toDate !== undefined
					? operTime <= date.toDate.getTime()
					: true)
			)
		}
		return false
	})
}

const OperationFilterFunction: TOperationFilterFunctions = {
	productIds: filterByProductsIds,
	isFormed: filterByIsFormed,
	dateExecution: filterByDateExecution,
}
// extends чтобы тайп скрипт понял что filter одинаковый при подстановки в function и  args
const filter = <T extends TOperationFilterKey>(
	filters: T[],
	operations: IOperation[],
	filterArgs: IOperationFilters,
): IOperation[] => {
	return filters.reduce((filteredOperations, filter) => {
		return OperationFilterFunction[filter](
			filteredOperations,
			filterArgs[filter],
		)
	}, operations)
}

export const useFilteredOperations = () => {
	const filters = useOperationFiltersStore(
		useShallow((state) => state.filterArgs()),
	)
	const operations = useOperationStore(
		useShallow((state) => state.operations),
	)

	console.log(
		operations,
		filters,
		"operations and filters in useFilteredOperations",
	)
	return useMemo(() => {
		return {
			filteredOperations: filter(
				["isFormed", "productIds", "dateExecution"],
				operations,
				filters,
			),
		}
	}, [operations, filters])
}
