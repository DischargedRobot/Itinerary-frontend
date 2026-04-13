"use client"
import { useInitialItinerariesPage } from "@/_page/ItinerariesPage/model"
import { ItineraryTableFull } from "@/widgets/IitineraryTableFull"

const ItinerariesPage = () => {
	useInitialItinerariesPage()

	return <ItineraryTableFull />
}

export default ItinerariesPage
