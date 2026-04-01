"use client"
import { useInitialItinerariesPage } from "@/_page/ItinerariesPage/model"
import { ItineraryTable } from "@/entities/Itinerary"
import { FilterItineraries } from "@/features/FilterItineraries"
// import { ItineraryOperationsTable } from "@/entities/Operations"

const ItinerariesPage = () => {
	useInitialItinerariesPage()

	return (
		<div className="flex flex-col gap-10">
			<FilterItineraries />
			<ItineraryTable />
		</div>
		// <ItineraryTable/>
	)
}

export default ItinerariesPage
