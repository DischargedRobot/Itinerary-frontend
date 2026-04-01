import { ICatergory } from "@/shared"
import { APIJSONRequest } from "@/shared/api"

export const categoryAPI = {
	getCategories: async (): Promise<ICatergory[]> => {
		return APIJSONRequest<ICatergory>("OperationCategories")
	},
}
