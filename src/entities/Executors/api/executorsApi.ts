import { APIJSONRequest } from "@/shared/api"
import { APIError } from "@/shared/api"
import { IDepartment } from "@/shared/lib"

interface IExecutorResponse {
	id: number
	name: string
	departmentId: number
	members: string[]
	isBrigade: boolean
	operationsIds: number[]
}

export const executorsAPI = {
	getExecutors: async (): Promise<IExecutorResponse[]> => {
		try {
			const executors =
				await APIJSONRequest<IExecutorResponse[]>("Executors")
			return executors
		} catch (error) {
			// if (error instanceof APIError) {
			//     console.log(error, 'error')

			//     showToast({
			//         message: error?.customMessage ?? error.message,
			//         type: 'error',
			//         duration: 3000,
			//     })
			// }
			throw error as APIError
		}
	},

	getExecutorsByDepartmentId: async (departmentId: IDepartment["id"]) => {
		const executors = await APIJSONRequest<IExecutorResponse[]>(
			`Executors/by-division?divisionID=${departmentId}`,
		)
		return executors
	},
}
