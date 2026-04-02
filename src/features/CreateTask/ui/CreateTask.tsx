import { Button } from "antd"
import { useCreateTask } from "../model"

export const CreateTask = () => {

    const {
        handleClick
    } = useCreateTask()

    return (
        <Button
            onClick={handleClick}
        />
    )
}