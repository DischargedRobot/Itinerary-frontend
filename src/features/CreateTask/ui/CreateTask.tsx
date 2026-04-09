import { Button } from "antd"
import { useCreateTask } from "../model"
import { FormattedMessageWithValues } from "@/shared/lang"

export const CreateTask = () => {
	const { handleClick } = useCreateTask()

	return (
		<Button
			title="Сформировать"
			className="w-30"
			size="medium"
			onClick={handleClick}
		>
			<FormattedMessageWithValues id="create" />
		</Button>
	)
}
