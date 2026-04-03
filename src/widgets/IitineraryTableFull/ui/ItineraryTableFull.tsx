import { ItineraryTable } from "@/entities/Itinerary/ui/ItineraryTable"
import { ItineraryOperationsTableFull } from "@/widgets/ItineraryOperationsTableFull"

export const ItineraryTableFull = () => {
    return (
        <ItineraryTable
            renderOperationsTable={(operations) => (
                <ItineraryOperationsTableFull operations={operations} />
            )}
        />
    )
}