"use client"
import { useInitial } from "@/_app"
import { useInitialItinerariesPage } from "@/_page/ItinerariesPage/model"
import { ItineraryTableFull } from "@/widgets/IitineraryTableFull"

const ItinerariesPage = () => {
	useInitial()
	useInitialItinerariesPage()

	return <ItineraryTableFull />
}

export default ItinerariesPage
