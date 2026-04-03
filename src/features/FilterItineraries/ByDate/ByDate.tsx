import { useItineraryFiltersStore } from "@/entities/Itinerary/model/useItineraryFiltersStore"
import { SelectDate } from "@/features/SelectDate"

export const ByDate = () => {
	const setDate = useItineraryFiltersStore((state) => state.setDate)
	const date = useItineraryFiltersStore((state) => state.date)

	return (
		<div className="flex items-center gap-1.5 title">
			Дата
			<SelectDate
				onSelect={(fromDate) => setDate({ ...date, fromDate })}
			/>
			:
			<SelectDate onSelect={(toDate) => setDate({ ...date, toDate })} />
		</div>
	)
}
