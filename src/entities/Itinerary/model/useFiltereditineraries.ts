import { useShallow } from "zustand/shallow"
import { useMemo } from "react"
import { useItineraryFiltersStore } from "./useItineraryFiltersStore"
import { IItinerary } from "../lib/ItineraryTypes"
import { useItineraryStore } from "./useItineraryStore"

export interface ItineraryFilters {
    planPositionId?: number
    productId?: number
}

type TFilterKey = keyof ItineraryFilters

type TFilteredFunction = {
    [K in TFilterKey]: (itineraries: IItinerary[], args: ItineraryFilters[K]) => IItinerary[]
}

// Фильтр по ID позиции плана
const filterByPositionPlanId: TFilteredFunction['planPositionId'] = (itineraries, positionPlanId) => {
    if (positionPlanId === undefined) {
        return itineraries
    }
    return itineraries.filter(itinerary => itinerary.positionPlanId === positionPlanId)
}

// Фильтр по ID продукта
const filterByProductId: TFilteredFunction['productId'] = (itineraries, productId) => {
    if (productId === undefined) {
        return itineraries
    }
    return itineraries.filter(itinerary => itinerary.product.id === productId)
}

// Объект с функциями фильтрации
const FilterFunction: TFilteredFunction = {
    planPositionId: filterByPositionPlanId,
    productId: filterByProductId,
}

// Общая функция для применения фильтров
const filterItineraries = <T extends TFilterKey>(
    filterKeys: T[],
    itineraries: IItinerary[],
    filterArgs: ItineraryFilters
): IItinerary[] => {
    return filterKeys.reduce((filteredItineraries, filterKey) => {
        return FilterFunction[filterKey](filteredItineraries, filterArgs[filterKey])
    }, itineraries)
}

// Хук для получения отфильтрованных маршрутов
export const useFilteredItineraries = () => {
    const filterArgs = useItineraryFiltersStore(
        useShallow(state => ({
            planPositionId: state.planPositionId,
            productId: state.productId,
        }))
    )
    const itineraries = useItineraryStore(state => state.itineraries)

    const filteredItineraries = useMemo(() => {
        return filterItineraries(
            ['planPositionId', 'productId'],
            itineraries,
            filterArgs
        )
    }, [itineraries, filterArgs])

    // // Синхронизация выбранных маршрутов (если нужно)
    // const selectedItineraries = useSelectedItinerariesStore(
    //     useShallow(state => state.selectedItineraries)
    // )
    // const setSelectedItineraries = useSelectedItinerariesStore(
    //     state => state.setSelectedItineraries
    // )

    // useEffect(() => {
    //         selectedItineraries.filter(selectedItin => 
    //             filteredItineraries.includes(selectedItin)
    //         )
    // }, [selectedItineraries, setSelectedItineraries, filteredItineraries])

    return filteredItineraries
}