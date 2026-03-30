import { APIJSONRequest } from "@/shared/api"
import { IEquipment } from "@/shared/lib"

export interface IEquipmentResponse extends Omit<IEquipment, 'operationType'>{
    operationTypeId: number
}

export const equipmentAPI = {

    getEquipments: async (): Promise<IEquipmentResponse[]> => {
        return APIJSONRequest<IEquipmentResponse>('Equipment')
    }
}