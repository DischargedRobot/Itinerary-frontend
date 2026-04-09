import { operationAPI } from "@/entities/Operations/api"
import {
	useOperationStore,
	useSelectedOperationsStore,
} from "@/entities/Operations/model"
import { useAPIErrorHandler } from "@/shared/api"

export const useCreateTask = () => {
	const setSelectedOperations = useSelectedOperationsStore(
		(state) => state.setOperations,
	)
	const selectedOperations = useSelectedOperationsStore(
		(state) => state.operations,
	)

	// const operations = useOperationStore((state) => state.operations)
	const setIsFormed = useOperationStore((state) => state.setIsFormed)

	const apiErrorCatcher = useAPIErrorHandler()
	const handleClick = async () => {
		console.log("useCreateTask", selectedOperations)
		try {
			await operationAPI.markOperationsAsFormed(
				selectedOperations.map((op) => op.id),
			)
			setSelectedOperations([])
			setIsFormed(selectedOperations)
		} catch (error) {
			apiErrorCatcher(error as Error)
		}
	}

	return { handleClick }
}
