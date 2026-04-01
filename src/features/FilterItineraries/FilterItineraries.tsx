import { ByDate } from "./ByDate"
import { ByProduct } from "./ByProduct"

export const FilterItineraries = () => {
	return (
		<div className="flex gap-10">
			<FilterItineraries.ByProduct />
			<FilterItineraries.ByDate />
		</div>
	)
}

FilterItineraries.ByDate = ByDate
FilterItineraries.ByProduct = ByProduct
