import { create } from "zustand"
import { DateFilter, ItineraryFilters } from "./useFiltereditineraries"

interface IItineraryFiltersStore extends ItineraryFilters {
	setPlanPositionId: (newPlanPositon: number) => void
	setProductId: (newProductId: number) => void
	setDate: (date: DateFilter) => void
}

export const useItineraryFiltersStore = create<IItineraryFiltersStore>(
	(set) => ({
		planPositionId: undefined,
		productId: undefined,
		date: {},

		setPlanPositionId: (planPositionId) => set({ planPositionId }),
		setProductId: (productId) => set({ productId }),
		setDate: (date) => set({ date }),
	}),
)
