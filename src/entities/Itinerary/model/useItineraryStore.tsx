import { create } from "zustand"
import { IItinerary } from "../lib"
import { IOperation } from "@/entities/Operations"

interface IItineraryStore {
	itineraries: IItinerary[]

	setItineraries: (newItineraries: IItinerary[]) => void
	// refreshItinerary: (newItinerary: IItinerary) => void
	addOperationsToIitnerary: (
		newOperations: IOperation[],
		itineraryId: number,
	) => void
}

export const useItineraryStore = create<IItineraryStore>((set) => ({
	itineraries: [],

	setItineraries: (newItineraries) => set({ itineraries: newItineraries }),
	// refreshItinerary: (newItinerary: IItinerary) => void
	addOperationsToIitnerary: (operations, itineraryId) =>
		set((state) => {
			const itinerary = state.itineraries.find(
				(itiner) => itiner.id === itineraryId,
			)!

			itinerary.operations = operations

			return {
				itineraries: [
					...state.itineraries.filter(
						(itiner) => itiner.id !== itinerary.id,
					),
					itinerary,
				],
			}
		}),
}))
