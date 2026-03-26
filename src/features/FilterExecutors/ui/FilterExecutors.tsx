import { ByBrigade } from "../ByBrigade"
import { ByDepartment } from "../ByDepartment"
import { ByMembers } from "../ByMembers"

export const FilterExecutors = () => {

    return (
        <div className="flex gap-3 align-center">
            <FilterExecutors.ByMembers/>
            <FilterExecutors.ByBrigade/>
        </div>
    )
}

FilterExecutors.ByMembers = ByMembers
FilterExecutors.ByBrigade = ByBrigade
FilterExecutors.ByDepartment = ByDepartment

