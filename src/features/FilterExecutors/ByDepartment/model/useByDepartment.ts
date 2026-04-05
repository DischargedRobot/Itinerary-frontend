import { executorsAPI, useExecutorsStore } from "@/entities/Executors"
import { mapAPIError } from "@/shared/api/apiError"
import { enrichAddObject, IDepartment } from "@/shared/lib"
import { useDepartmentStore } from "@/shared/model"
import { useState } from "react"
import useSWR, { mutate } from "swr"

interface IExecutorResponse {
	id: number
	name: string
	departmentId: number
	members: string[]
	isBrigade: boolean
	operationsIds: number[]
}

export const useByDepartment = () => {
	const [value, setValue] = useState<number | null>()

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
		// console.log(departmentId, 'departmentId')
		setValue(departmentId)

		const executors =
			(await mutate<IExecutorResponse[]>(
				[
					["executors", "departmentId"],
					["all", value],
				].toString(),
				() => executorsAPI.getExecutorsByDepartmentId(departmentId),
				{ revalidate: false },
			).then((executorsResponse) =>
				executorsResponse?.map((executor) => {
					const department = departments.find(
						(dep) => dep.id === departmentId,
					)
					// связываем отделы с айдишниками отделов в эксекьюторе
					const enrichExecutor = enrichAddObject<
						(typeof executorsResponse)[number],
						IDepartment
					>()(
						{ sourceKey: "id", inputKey: "departmentId" },
						"all",
						departments,
						"department",
					)

					const { operationsIds, ...data } =
						enrichExecutor(executor).object
					// console.log(executor, 'executor', operationsIds)
					if (department) {
						return {
							...data,
							operations:
								operationsIds?.map((operationId) => ({
									id: operationId,
								})) || [],
						}
					}

					// если ошибка в данных (экзекьютор содержит отсутствующий айди отдела)
					throw mapAPIError(404)
				}),
			)) || []
		// console.log(executors, 'executors')
		setExecutors(executors)
	}

	return { value, handleSelect, departments }
}
