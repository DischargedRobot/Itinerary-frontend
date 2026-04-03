import { Select } from "antd"
import { useSelectExecutorInTable } from "../model"
import { IExecutor } from "@/entities/Executors"

interface Props {
	defaultValue?: IExecutor
	onChange?: (executor: IExecutor) => void
}

export const SelectExecutorInTable = (props: Props) => {
	const { defaultValue, onChange } = props

	const { executors } = useSelectExecutorInTable()

	return (
		<Select
			className="w-full text text_2very-litle text_tiny border-0! hover:border-0! active:border-0! shadow-none!"
			styles={{
				popup: {
					root: {
						width: 150,
					},
					list: {
						width: "100%",
					},
				},
			}}
			options={executors.map((executor) => ({
				label: executor.name,
				value: executor.id,
			}))}
			defaultValue={defaultValue?.id}
			onChange={(value) => {
				const executor = executors.find((e) => e.id === value)
				if (executor) onChange?.(executor)
			}}
		/>
	)
}
