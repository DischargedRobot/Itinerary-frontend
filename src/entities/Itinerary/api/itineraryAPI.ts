import { APIJSONRequest } from "@/shared/api"
import { IItinerary } from "../lib"

interface IItineraryResponse extends Omit<
	IItinerary,
	"product" | "operations" | "kit" | "increasingKit"
> {
	productId: number
	operationsIds: number[]
	kitIncreasingKit: string
}

export const itineraryAPI = {
	getItineraries: async () => {
		return APIJSONRequest<IItineraryResponse>("Itinerary")
	},

	getItinerariesByPlanPositionId: async (planPositionId: number) => {
		return APIJSONRequest<IItineraryResponse>(
			`Itinerary/by-plan-position${planPositionId}`,
		)
	},

	getItinerariesByPlanPositionIds: async (planPositionIds: number[]) => {
		return APIJSONRequest<IItineraryResponse[]>(
			`Itinerary/by-plan-positions`,
			{ method: "POST", body: JSON.stringify(planPositionIds) },
		)
	},
}
