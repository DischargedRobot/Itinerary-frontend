import { IEquipment } from "@/shared/lib";
import { mockEquipment } from "@/shared/testData/testData";
import { create } from "zustand";

interface IEquipmentStore { 
    equipments: IEquipment[]

    setEquipments: (newEquipments: IEquipment[]) => void
}

export const useEquipmentStore = create<IEquipmentStore>(set => ({

    equipments: mockEquipment,

    setEquipments: (equipments) => set({equipments})
}))