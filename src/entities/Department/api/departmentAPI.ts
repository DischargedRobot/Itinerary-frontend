import { APIJSONRequest } from "@/shared/api"
import { IDepartment } from "@/shared/lib"

interface IDepartmentResponse extends IDepartment{
    id: number
    name: string
}

export const departmentsAPI = {

    getDepartment: async (): Promise<IDepartmentResponse[]> => {
        return APIJSONRequest<IDepartmentResponse>('Department')
    }
}