import { useEquipmentStore } from "@/entities/Equipment"

export const useSelectEquipment = () => {
	const equipments = useEquipmentStore((state) => state.equipments)

	return { equipments }
}
