import { useShallow } from "zustand/shallow"
import { useMemo } from "react"
import { IEquipment } from "@/shared/lib"
import { useEquipmentStore } from "./useEquipmentStore"

export interface EquipmentFilters {
	name: string
	operationTypeId: number | null
}

type TFilterKey = keyof EquipmentFilters

type TFilteredFunction = {
	[K in TFilterKey]: (
		equipments: IEquipment[],
		args: EquipmentFilters[K],
	) => IEquipment[]
}

// Фильтр по названию
const filterByName: TFilteredFunction["name"] = (equipments, name) => {
	if (!name) {
		return equipments
	}
	return equipments.filter((equipment) =>
		equipment.name.toLowerCase().includes(name.toLowerCase()),
	)
}

// Фильтр по типу операции
const filterByOperationTypeId: TFilteredFunction["operationTypeId"] = (
	equipments,
	operationTypeId,
) => {
	if (operationTypeId === null) {
		return equipments
	}
	return equipments.filter(
		(equipment) => equipment.operationType.id === operationTypeId,
	)
}

const FilterFunction: TFilteredFunction = {
	name: filterByName,
	operationTypeId: filterByOperationTypeId,
}

export const filterEquipments = <T extends TFilterKey>(
	filterKeys: T[],
	equipments: IEquipment[],
	filterArgs: EquipmentFilters,
): IEquipment[] => {
	return filterKeys.reduce((filteredEquipments, filterKey) => {
		return FilterFunction[filterKey](
			filteredEquipments,
			filterArgs[filterKey],
		)
	}, equipments)
}

export const useFilteredEquipment = (filters: EquipmentFilters) => {
	const equipments = useEquipmentStore((state) => state.equipments)

	const filteredEquipments = useMemo(() => {
		return filterEquipments(
			["name", "operationTypeId"],
			equipments,
			filters,
		)
	}, [equipments, filters])

	return filteredEquipments
}
