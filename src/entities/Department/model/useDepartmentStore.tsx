import { IDepartment } from "@/shared/lib"
import { create } from "zustand"

interface IDepartmentStore {
	departments: IDepartment[]

	setDepartments: (newDepartments: IDepartment[]) => void
}

export const useDepartmentStore = create<IDepartmentStore>((set) => ({
	departments: [],

	setDepartments: (departments) => set({ departments }),
}))
