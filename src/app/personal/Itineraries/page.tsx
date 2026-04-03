"use client"
import { useInitial } from "@/_app"
import { useInitialItinerariesPage } from "@/_page/ItinerariesPage/model"
import { ItineraryTable } from "@/entities/Itinerary"
import { FilterItineraries } from "@/features/FilterItineraries"
import { ItineraryTableFull } from "@/widgets/IitineraryTableFull"
// import { ItineraryOperationsTable } from "@/entities/Operations"

const ItinerariesPage = () => {
	useInitial()
	useInitialItinerariesPage()

	return (
		<div className="flex flex-col gap-10">
			<FilterItineraries />
			<ItineraryTableFull />
		</div>
		// <ItineraryTable/>
	)
}

export default ItinerariesPage
