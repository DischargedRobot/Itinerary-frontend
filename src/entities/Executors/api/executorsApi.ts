import { APIJSONRequest } from "@/shared/api"
import { APIError } from "@/shared/api"
import { IDepartment } from "@/shared/lib"
import { IExecutor } from "../lib"

interface IExecutorResponse {
	id: number
	divisionID: number
	members: string[]
	isBrigade: boolean
	operationsIDs?: number[]
}

const toExecutor = (executor: IExecutorResponse): IExecutor => ({
	id: executor.id,
	members: executor.members,
	name:
		executor.members.length === 1
			? executor.members[0]
			: `Бригада${executor.id}`,
	isBrigade: executor.isBrigade,
	department: {
		id: executor.divisionID,
	} as IExecutor["department"],
	operations: (executor.operationsIDs ?? []).map((id) => ({ id })),
})

export const executorsAPI = {
	getExecutors: async (): Promise<IExecutor[]> => {
		try {
			const executors =
				await APIJSONRequest<IExecutorResponse[]>("Executors")
			return executors.map(toExecutor)
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
		return executors.map(toExecutor)
	},
}
