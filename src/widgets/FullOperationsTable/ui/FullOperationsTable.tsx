"use client"

import { memo } from "react"
import OperationTable from "@/entities/Operations/ui/OperationTable"
import { IOperation } from "@/entities/Operations/lib/OperationTypes"

interface FullOperationsTableProps {
	operations: IOperation[]
}

const FullOperationsTable = ({ operations }: FullOperationsTableProps) => {
	return <OperationTable operations={operations} />
}

export default memo(FullOperationsTable)
