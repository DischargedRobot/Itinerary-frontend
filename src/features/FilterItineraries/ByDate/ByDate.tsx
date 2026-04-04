import { useItineraryFiltersStore } from "@/entities/Itinerary/model/useItineraryFiltersStore"
import { SelectDate } from "@/features/SelectDate"

const now = new Date()
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

export const ByDate = () => {
	const setDate = useItineraryFiltersStore((state) => state.setDate)
	const date = useItineraryFiltersStore((state) => state.date)

	return (
		<div className="flex items-center gap-1.5 title">
			Дата
			<SelectDate
				onSelect={(fromDate) => setDate({ ...date, fromDate })}
				defaultDate={startOfMonth}
			/>
			:
			<SelectDate
				onSelect={(toDate) => setDate({ ...date, toDate })}
				defaultDate={endOfMonth}
			/>
		</div>
	)
}
