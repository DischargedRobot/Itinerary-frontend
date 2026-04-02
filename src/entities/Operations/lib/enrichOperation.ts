// import { enrichAddObject, IDepartment} from "@/shared/lib"
// import { types } from "sass";

import { ITypeOperation } from "@/entities/OperationType"
import { ICatergory } from "@/shared"
import { IDepartment, IEquipment } from "@/shared/lib"
import { IOperationResponse } from "../api"
import { useDepartmentStore } from "@/shared/model"
import { IOperation } from "./OperationTypes"

// type EntityMap<T> = {
//   [K in keyof T]: K;
//   // можно добавить другие сущности
// };

// export const enrichOperation = <
//     TInput,
// > (inputObject: TInput, source: unknown[], newObjectsNames: string[], types: readonly string[], inputKeys: keyof TInput[], sourceKey: string[]) =>
//     {
//         type EntityTypes = EntityMap<typeof types>;

//         types.reduce((finishedObject: unknown, type) => {
//             const enrichBy = enrichAddObject<typeof finishedObject, EntityTypes[typeof type]>()(
//                 {sourceKey: 'id', inputKey: 'departmentId'},
//                 'all',
//                 departments,
//                 'department'
//             )
//             return enrichBy(finishedObject)
//         }, {inputObject})

//         const enrichByCategory = enrichAddObject<
//     }

//TODO: мб передлать под энрич
export const enrichOperation = (
	executorOper: IOperationResponse,
	departments: IDepartment[],
	equipments: IEquipment[],
	categories: ICatergory[],
	operationTypes: ITypeOperation[],
): IOperation | IOperationResponse => {
	const department = departments.find(
		(dep) => dep.id === executorOper.departmentId,
	)
	const equipment = equipments.find(
		(equip) => equip.id === executorOper.equipmentId,
	)
	const category = categories.find(
		(categorie) => categorie.id === executorOper.categoryId,
	)
	const operationType = operationTypes.find(
		(operationType) => operationType.id === executorOper.typeId,
	)
	// console.log(department, departments, equipment,category, operationType, executorOper.product, products, 'no error',executorOper)

	if (department && equipment && category && operationType) {
		const { departmentId, equipmentId, categoryId, typeId, ...withoutIds } =
			executorOper
		return {
			...withoutIds,
			department,
			equipment,
			category,
			type: operationType,
		}
	}
	return executorOper
}
