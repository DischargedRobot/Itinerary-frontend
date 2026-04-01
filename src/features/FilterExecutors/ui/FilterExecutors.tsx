import { ByBrigade } from "../ByBrigade"
import { ByDepartment } from "../ByDepartment"
import { ByMembers } from "../ByMembers"

export const FilterExecutors = () => {
	return (
		<div className="flex align-center gap-3 w-min">
			<FilterExecutors.ByMembers />
			<FilterExecutors.ByBrigade />
		</div>
	)
}

FilterExecutors.ByMembers = ByMembers
FilterExecutors.ByBrigade = ByBrigade
FilterExecutors.ByDepartment = ByDepartment
