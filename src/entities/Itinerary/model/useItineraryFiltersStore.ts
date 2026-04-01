import { create } from "zustand"
import { ItineraryFilters } from "./useFiltereditineraries"

interface IItineraryFiltersStore extends ItineraryFilters {
	setPlanPositionId: (newPlanPositon: number) => void
	setProductId: (newProductId: number) => void
	// setStartingDate: (newStartingDate: Date) => void
	// setEndDate: (newEndDate: Date) => void
}

export const useItineraryFiltersStore = create<IItineraryFiltersStore>(
	(set) => ({
		planPositionId: undefined,
		productId: undefined,
		// startingDate: undefined,
		// endDate: undefined,

		setPlanPositionId: (planPositionId) => set({ planPositionId }),
		setProductId: (productId) => set({ productId }),
		// setStartingDate: (startingDate) => set({startingDate}),
		// setEndDate: (endDate) => set({endDate}),
	}),
)
