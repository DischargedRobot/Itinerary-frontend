import { Select } from "antd"
import { useSelectEquipment } from "../model"
import { IEquipment } from "@/shared/lib"

interface Props {
	defaultValue?: IEquipment
}

export const SelectEquipment = (props: Props) => {
	const { defaultValue } = props

	const { equipments } = useSelectEquipment()

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
			options={equipments.map((equip) => ({
				label: equip.name,
				value: equip.id,
			}))}
			defaultValue={{
				label: defaultValue?.name,
				value: defaultValue?.id,
			}}
		/>
	)
}
