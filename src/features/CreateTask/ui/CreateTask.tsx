import { Button } from "antd"
import { useIntl } from "react-intl"
import { useCreateTask } from "../model"
import { FormattedMessageWithValues } from "@/shared/lang"

export const CreateTask = () => {
	const { handleClick } = useCreateTask()
	const intl = useIntl()

	return (
		<Button
			title={intl.formatMessage({ id: "create" })}
			className="w-30"
			size="medium"
			onClick={handleClick}
		>
			<FormattedMessageWithValues id="create" />
		</Button>
	)
}
