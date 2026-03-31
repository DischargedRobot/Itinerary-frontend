import { enrich, IEquipment } from "@/shared/lib"
import { IEquipmentResponse } from "./equipmentAPI"
import { ITypeOperation } from "@/entities/OperationType"
import { mapAPIError } from "@/shared/api/apiError"
import { enrichAddObject } from "@/shared/lib/enrich"
import { IOperation } from "@/entities/Operations"

/** Вспомогательные функции для обработки equipmentAPI запросов */
export const equipmentAPIUtilities = {

    enrichEquipmentResponse: (
        equipments: IEquipmentResponse[], 
        operationsTypes: ITypeOperation[]
    ): IEquipment[] => {
        const enrichWithbject = enrichAddObject<IEquipmentResponse, ITypeOperation>()(
            {sourceKey: 'id', inputKey: 'operationTypeId'} as const, 
            ['id', 'name'] as const, 
            operationsTypes,
            'operationType' as const,
        )
        
        return equipments.reduce<IEquipment[]>((allEquipment, equipment) => {
            const resultEnrich = enrichWithbject(equipment)
            if (resultEnrich.success) {
                allEquipment.push(resultEnrich.object)
                return allEquipment
            }
            
            
            // const operationType = operationsTypes.find(item => item.id === operationTypeId)
            // if (operationType) {
            //     allEquipment.push({operationType, ...equipment})
            //     return allEquipment
            // }
            // если вдруг с сервера не пришли те типы, которые есть в оборудовании, то пусть будет "not found",
            // хотя по хорошему нежно делать на беке кастомыне ошибки
            throw mapAPIError(404)
        }, [])
    }
}