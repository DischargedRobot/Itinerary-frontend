import { ItineraryTable } from "@/entities/Itinerary"
import { FilterItineraries } from "@/features/FilterItineraries"
// import { ItineraryOperationsTable } from "@/entities/Operations"

const ItinerariesPage = () => {

    return (
        <div className="flex flex-col gap-10">
            <FilterItineraries/>
            <ItineraryTable/>
        </div>
        // <ItineraryTable/>
    )
}

export default ItinerariesPage