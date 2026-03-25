import { FullExecutorList } from "@/widgets/FullExecutorList"
import { FullOperationsTable } from "@/widgets/FullOperationsTable/ui"
import { FullProductTable } from "@/widgets/FullProductTable"

const TaskLists = () => {

    return (
        <div>
            <FullExecutorList/>
            <FullProductTable/>
            <FullOperationsTable/>
        </div>
    )
}

export default TaskLists