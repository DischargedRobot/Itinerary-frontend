import { Select } from "antd"
import { useByPlanPosition } from "../model"

export const ByPlanPosition = () => {
	const { planPositions, handleSelect } = useByPlanPosition()

	return (
		<Select
			options={planPositions.map((planPos) => ({
				value: planPos.id,
				lable: planPos.id,
			}))}
			onSelect={handleSelect}
		/>
	)
}
