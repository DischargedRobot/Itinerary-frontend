// import { enrichAddObject, IDepartment} from "@/shared/lib"
// import { types } from "sass";

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