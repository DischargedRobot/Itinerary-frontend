import { APIJSONRequest } from "@/shared/api"
import { IDepartment } from "@/shared/lib"


export const departmentAPI = {

    getDepartments: async (): Promise<IDepartment[]> => {
        return APIJSONRequest<IDepartment>('Divisions')
    }
}