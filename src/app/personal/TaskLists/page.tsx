import './TaskLists.scss'

import { FilterExecutors } from "@/features/FilterExecutors"
import { FilterProductByDate } from "@/features/FilterProductByDate"
import { FullExecutorList } from "@/widgets/FullExecutorList"
import { FullOperationsTable } from "@/widgets/FullOperationsTable/ui"
import { FullProductTable } from "@/widgets/FullProductTable"


const TaskLists = () => {

    return (
        <div>
            <div className="flex gap-3">
                <FilterProductByDate/>
                <FilterExecutors.ByDepartment/>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-3">
                <FullExecutorList/>
                <div>
                    <FullProductTable/>
                    <FullOperationsTable/>
                </div>
            </div>
        </div>
    )
}

export default TaskLists