import { IOperation } from "@/entities/Operations"
import {
	useOperationStore,
	useSelectedOperationsStore,
} from "@/entities/Operations/model"

export const useCreateTask = () => {
	const setSelectedOperations = useSelectedOperationsStore(
		(state) => state.setOperations,
	)
	const selectedOperations = useSelectedOperationsStore(
		(state) => state.operations,
	)

	// const operations = useOperationStore((state) => state.operations)
	const setIsFormed = useOperationStore((state) => state.setIsFormed)

	const handleClick = () => {
		setSelectedOperations([])
		setIsFormed(selectedOperations)
	}

	return { handleClick }
}
