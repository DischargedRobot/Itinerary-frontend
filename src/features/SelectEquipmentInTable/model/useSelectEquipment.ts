import { useFilteredEquipment } from "@/entities/Equipment"

export const useSelectEquipment = (operationTypeId: number | null = null) => {
	const filteredEquipments = useFilteredEquipment({
		name: "",
		operationTypeId,
	})

	return { equipments: filteredEquipments }
}
