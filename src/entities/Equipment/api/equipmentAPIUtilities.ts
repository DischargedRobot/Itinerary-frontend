import { IEquipment } from "@/shared/lib"
import { IEquipmentResponse } from "./equipmentAPI"
import { ITypeOperation } from "@/entities/OperationType"
import { mapAPIError } from "@/shared/api/apiError"

/** Вспомогательные функции для обработки equipmentAPI запросов */
export const equipmentAPIUtilities = {

//   ({ match, extract = [], source = [] }) =>
//   (inputObj) => {
//     if (!match) return inputObj;
//     if (!extract?.length) return inputObj;
//     if (!source) return inputObj;
//     if (!source?.length) return inputObj;
//     let matchingItem = source.find(
//       (s) => s[match.sourceKey] === inputObj[match.inputKey]
//     );
//     if (!matchingItem) return inputObj;
//     return extract.reduce((acc, key) => {
//       return {
//         ...acc,
//         [key]: matchingItem[key],
//       };
//     }, inputObj);
//   };
    enrichEquipmentResponse: (
        equipments: IEquipmentResponse[], 
        operationsTypes: ITypeOperation[]
    ): IEquipment[] => {
        return equipments.reduce<IEquipment[]>((allEquipment, {operationTypeId: operationTypeId, ...equipment}) => {
            const operationType = operationsTypes.find(item => item.id === operationTypeId)
            if (operationType) {
                allEquipment.push({operationType, ...equipment})
                return allEquipment
            }
            // если вдруг с сервера не пришли те типы, которые есть в оборудовании, то пусть будет "not found",
            // хотя по хорошему нежно делать на беке кастомыне ошибки
            throw mapAPIError(404)
        }, [])
    }
}