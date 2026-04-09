import { IEquipment } from "@/shared/lib"
import { create } from "zustand"

interface IEquipmentStore {
	equipments: IEquipment[]

	setEquipments: (newEquipments: IEquipment[]) => void
}

export const useEquipmentStore = create<IEquipmentStore>((set) => ({
	equipments: [],

	setEquipments: (equipments) => set({ equipments }),
}))
