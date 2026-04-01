import { useExecutorsStore } from "@/entities/Executors"

export const useSelectExecutorInTable = () => {
	const executors = useExecutorsStore((state) => state.executors)

	return { executors }
}
