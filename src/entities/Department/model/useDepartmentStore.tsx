import { IDepartment } from "@/shared/lib";
import { mockDepartments } from "@/shared/testData/testData";
import { create } from "zustand";

interface IDepartmentStore {
    departments: IDepartment[]
    
    setDepartments: (newDepartments: IDepartment[]) => void
}

export const useDepartmentStore = create<IDepartmentStore>(set => ({

    departments: [],

    setDepartments: (departments) => set({departments})

}))