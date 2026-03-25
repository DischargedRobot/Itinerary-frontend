import { ByBrigade } from "../ByBrigade"
import { ByMembers } from "../ByMembers/ui"

export const FilterExecutors = () => {

    return (
        <div>
            <FilterExecutors.ByMembers/>
            <FilterExecutors.ByBrigade/>
        </div>
        
    )
}

FilterExecutors.ByMembers = ByMembers
FilterExecutors.ByBrigade = ByBrigade