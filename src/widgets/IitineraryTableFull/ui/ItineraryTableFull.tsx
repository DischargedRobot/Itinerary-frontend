import { ItineraryTable } from "@/entities/Itinerary/ui/ItineraryTable"
import { ItineraryOperationsTableFull } from "@/widgets/ItineraryOperationsTableFull"
import { FilterItineraries } from "@/features/FilterItineraries"

export const ItineraryTableFull = () => {
	return (
		<div className="flex flex-col gap-10">
			<FilterItineraries />
			<ItineraryTable
				renderOperationsTable={(operations) => (
					<ItineraryOperationsTableFull operations={operations} />
				)}
			/>
		</div>
	)
}
