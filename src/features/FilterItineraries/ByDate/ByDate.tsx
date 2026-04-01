import { IItinerary } from "@/entities/Itinerary"
import { useItineraryFiltersStore } from "@/entities/Itinerary/model/useItineraryFiltersStore"
import { SelectDate } from "@/features/SelectDate"

export const ByDate = () => {
	// const setStartinDate = useFilter(state => state.)

	return (
		<div className="flex items-center gap-1.5 title ">
			Дата
			<SelectDate onSelect={(fromDate) => {}} />
			:
			<SelectDate onSelect={(toDate) => {}} />
		</div>
	)
}
