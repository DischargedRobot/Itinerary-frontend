import { Button } from "antd"
import { useCreateTask } from "../model"

export const CreateTask = () => {

    const {
        handleClick
    } = useCreateTask()

    return (
        <Button
            title="Сформировать"
            className="w-30"
            size="medium"
            onClick={handleClick}
        >
            Сформировать
        </Button>
    )
}