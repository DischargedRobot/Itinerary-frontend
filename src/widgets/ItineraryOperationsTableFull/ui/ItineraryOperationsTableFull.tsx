import { IOperation } from "@/entities/Operations/lib"
import { ItineraryOperationsTable } from "@/entities/Operations/ui/ItineraryOperationsTable/ItineraryOperationsTable"
import { SelectEquipment } from "@/features/SelectEquipment"
import { SelectExecutorInTable } from "@/features/SelectExecutorInTable/ui/SelectExecutorInTable"

interface Props {
	operations: IOperation[]
}

export const ItineraryOperationsTableFull = ({ operations }: Props) => {
	return (
		<ItineraryOperationsTable
			operations={operations}
			renderEquipment={(equipment) => <SelectEquipment defaultValue={equipment} />}
			renderExecutor={(executor) => <SelectExecutorInTable defaultValue={executor} />}
		/>
	)
}