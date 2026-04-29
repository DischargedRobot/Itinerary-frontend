"use client"

import { memo } from "react"
import { OperationTable } from "@/entities/Operations/ui/OperationTable"
import { IOperation } from "@/entities/Operations/lib/OperationTypes"
import { SelectDate } from "@/features/SelectDate"

interface FullOperationsTableProps {
	operations: IOperation[]
	selectedProductIds?: number[]
	onProductDeselect?: (productId: number) => void
}

const FullOperationsTable = ({ operations, selectedProductIds, onProductDeselect }: FullOperationsTableProps) => {
	return (
		<OperationTable
			DateRenderer={SelectDate}
			operations={operations}
			selectedProductIds={selectedProductIds}
			onProductDeselect={onProductDeselect}
		/>
	)
}

export default memo(FullOperationsTable)
