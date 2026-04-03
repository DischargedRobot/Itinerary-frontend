import { useShallow } from "zustand/shallow"
import { useMemo } from "react"
import { useItineraryFiltersStore } from "./useItineraryFiltersStore"
import { IItinerary, IItineraryWithFullOpearions } from "../lib/ItineraryTypes"
import { useItineraryStore } from "./useItineraryStore"
import { IOperation, isIOperation } from "@/entities/Operations"

export interface DateFilter {
	fromDate?: Date
	toDate?: Date
}

export interface ItineraryFilters {
	planPositionId?: number
	productId?: number
	date: DateFilter
}

type TFilterKey = keyof ItineraryFilters

type TFilteredFunction = {
	[K in TFilterKey]: (
		itineraries: IItinerary[],
		args: ItineraryFilters[K],
	) => IItinerary[]
}

// Фильтр по ID позиции плана
const filterByPositionPlanId: TFilteredFunction["planPositionId"] = (
	itineraries,
	positionPlanId,
) => {
	if (positionPlanId === undefined) {
		return itineraries
	}
	return itineraries.filter(
		(itinerary) => itinerary.positionPlanId === positionPlanId,
	)
}

// Фильтр по ID продукта
const filterByProductId: TFilteredFunction["productId"] = (
	itineraries,
	productId,
) => {
	if (productId === undefined) {
		return itineraries
	}
	return itineraries.filter((itinerary) => itinerary.product.id === productId)
}

// Фильтр по дате
const toDay = (date: Date) =>
	new Date(date.getFullYear(), date.getMonth(), date.getDate())

const filterByDate: TFilteredFunction["date"] = (itineraries, date) => {
	const { fromDate, toDate } = date
	if (!fromDate && !toDate) return itineraries
	return itineraries.filter(({ date: itinDate }) => {
		const day = toDay(itinDate)
		if (fromDate && day < toDay(fromDate)) return false
		if (toDate && day > toDay(toDate)) return false
		return true
	})
}

// Объект с функциями фильтрации
const FilterFunction: TFilteredFunction = {
	planPositionId: filterByPositionPlanId,
	productId: filterByProductId,
	date: filterByDate,
}

// Общая функция для применения фильтров
const filterItineraries = <T extends TFilterKey>(
	filterKeys: T[],
	itineraries: IItinerary[],
	filterArgs: ItineraryFilters,
): IItinerary[] => {
	return filterKeys.reduce((filteredItineraries, filterKey) => {
		return FilterFunction[filterKey](
			filteredItineraries,
			filterArgs[filterKey],
		)
	}, itineraries)
}

// Хук для получения отфильтрованных маршрутов
export const useFilteredItineraries = () => {
	const filterArgs = useItineraryFiltersStore(
		useShallow((state) => ({
			planPositionId: state.planPositionId,
			productId: state.productId,
			date: state.date,
		})),
	)
	const itineraries = useItineraryStore((state) => state.itineraries)

	const filteredItineraries = useMemo(() => {
		return filterItineraries(
			["planPositionId", "productId", "date"],
			itineraries,
			filterArgs,
		)
	}, [itineraries, filterArgs])

	const allOperationsAreIOperation = filteredItineraries.every((itiner) =>
		itiner.operations.every((op) => isIOperation(op)),
	)

	if (allOperationsAreIOperation) {
		return filteredItineraries as IItineraryWithFullOpearions[]
	}

	return filteredItineraries.map(({ operations, ...itiner }) => ({
		...itiner,
		operations: [],
	})) as IItineraryWithFullOpearions[]
}
