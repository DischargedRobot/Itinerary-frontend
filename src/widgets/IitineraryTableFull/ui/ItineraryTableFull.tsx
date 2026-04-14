import { useState } from "react"
import { ItineraryTable } from "@/entities/Itinerary/ui/ItineraryTable"
import { ItineraryOperationsTableFull } from "@/widgets/ItineraryOperationsTableFull"
import { FilterItineraries } from "@/features/FilterItineraries"

export const ItineraryTableFull = () => {
	const [isLoading, setIsLoading] = useState(false)

	return (
		<div className="flex flex-col gap-10">
			<FilterItineraries setLoading={setIsLoading} />
			<ItineraryTable
				isLoading={isLoading}
				renderOperationsTable={(operations) => (
					<ItineraryOperationsTableFull operations={operations} />
				)}
			/>
		</div>
	)
}
