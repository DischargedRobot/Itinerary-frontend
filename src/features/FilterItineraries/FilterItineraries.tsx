import { ByDate } from "./ByDate"
import { ByProduct } from "./ByProduct"

interface Props {
	setLoading?: (v: boolean) => void
}

export const FilterItineraries = ({ setLoading }: Props) => {
	return (
		<div className="flex gap-10">
			<FilterItineraries.ByProduct setLoading={setLoading} />
			<FilterItineraries.ByDate />
		</div>
	)
}

FilterItineraries.ByDate = ByDate
FilterItineraries.ByProduct = ByProduct
