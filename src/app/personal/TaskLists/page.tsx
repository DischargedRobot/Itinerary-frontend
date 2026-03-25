import { FilterExecutors } from "@/features/FilterExecutors"
import { FullExecutorList } from "@/widgets/FullExecutorList"
import { FullOperationsTable } from "@/widgets/FullOperationsTable/ui"
import { FullProductTable } from "@/widgets/FullProductTable"

const TaskLists = () => {

    return (
        <div>
            <div>
                <FilterExecutors.ByDepartment/>
            </div>
            <FullExecutorList/>
            <FullProductTable/>
            <FullOperationsTable/>
        </div>
    )
}

export default TaskLists