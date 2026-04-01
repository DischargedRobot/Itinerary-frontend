import { ByDate } from "./ByDate"
import { ByProduct } from "./ByProduct"

export const FilterItineraries = () => {
    return (
        <div>
            <FilterItineraries.ByDate/>
            <FilterItineraries.ByProduct/>
        </div>
    )
}

FilterItineraries.ByDate = ByDate
FilterItineraries.ByProduct = ByProduct
