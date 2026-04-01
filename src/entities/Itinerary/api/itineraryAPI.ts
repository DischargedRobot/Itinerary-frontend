import { APIJSONRequest } from "@/shared/api"
import { IItinerary } from "../lib"

interface IItineraryResponse extends Omit<IItinerary, "product"> {
	productId: number
}

export const itineraryAPI = {
	getItineraries: async () => {
		return APIJSONRequest<IItineraryResponse>("Equipment")
	},
}
