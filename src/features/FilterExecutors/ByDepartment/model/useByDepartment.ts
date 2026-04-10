import { executorsAPI, useExecutorsStore } from "@/entities/Executors"
import { mapAPIError } from "@/shared/api/apiError"
import { useDepartmentStore } from "@/shared/model"
import { useState } from "react"
import { mutate } from "swr"

interface IExecutorResponse {
	id: number
	name: string
	departmentId: number
	members: string[]
	isBrigade: boolean
	operationsIds: number[]
}

export const useByDepartment = () => {
	const [value, setValue] = useState<number | null>(null)

	const departments = useDepartmentStore((state) => state.departments)
	const setExecutors = useExecutorsStore((state) => state.setExecutors)

	// const { data: executorsResponce, mutate } = useSWR(
	// 	[
	// 		["executors", "departmentId"],
	// 		["all", value],
	// 	].toString(),
	// 	() => {
	// 		if (value) {
	// 			return executorsAPI.getExecutorsByDepartmentId(value)
	// 		}
	// 		return [] as IExecutorResponse[]
	// 	},
	// )

	const handleSelect = async (departmentId: number) => {
		setValue(departmentId)

		const executors =
			(await mutate<IExecutorResponse[]>(
				[
					["executors", "departmentId"],
					["all", departmentId],
				].toString(),
				() => executorsAPI.getExecutorsByDepartmentId(departmentId),
				{ revalidate: false },
			).then((executorsResponse) =>
				executorsResponse?.map((executor) => {
					const department = departments.find(
						(dep) => dep.id === departmentId,
					)

					if (!department) {
						throw mapAPIError(404)
					}

					return {
						id: executor.id,
						name: executor.name,
						members: executor.members,
						isBrigade: executor.isBrigade,
						department,
						operations:
							executor.operationsIds?.map((operationId) => ({
								id: operationId,
							})) || [],
					}
				}),
			)) || []

		setExecutors(executors)
	}

	return { value, handleSelect, departments }
}
