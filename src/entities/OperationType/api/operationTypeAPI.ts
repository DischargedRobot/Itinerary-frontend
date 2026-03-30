import { APIJSONRequest } from "@/shared/api"
import { ITypeOperation } from "../lib"

export const operationTypeAPI = {
    getOperationsTypes: async (): Promise<ITypeOperation[]> => {
        return APIJSONRequest<ITypeOperation>('TypesOperations')
    }
}