import { Select } from "antd"
import { useSelectEquipment } from "../model"
import { IEquipment } from "@/shared/lib"

interface Props {
	defaultValue?: IEquipment
	onChange?: (equipment: IEquipment) => void
	operationTypeId?: number | null
	disabled?: boolean
}

export const SelectEquipment = (props: Props) => {
	const { defaultValue, onChange, operationTypeId = null, disabled } = props

	const { equipments } = useSelectEquipment(operationTypeId)

	console.log(operationTypeId, equipments, "operation")
	return (
		<Select
			disabled={disabled}
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
			options={equipments.map((equip) => ({
				label: equip.name,
				value: equip.id,
			}))}
			defaultValue={defaultValue?.id}
			onChange={(value) => {
				console.log("equip", value)
				const equipment = equipments.find((e) => e.id === value)
				if (equipment) onChange?.(equipment)
			}}
		/>
	)
}
