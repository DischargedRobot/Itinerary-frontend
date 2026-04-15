"use client"

import "./TaskLists.scss"

import { FullExecutorList } from "@/widgets/FullExecutorList"
import { FullOperationsTable } from "@/widgets/FullOperationsTable"
import { FullProductTable } from "@/widgets/FullProductTable"
import { TopTaskListsFilters } from "@/widgets/TopTaskListsFilters"
import { CreateTask } from "@/features/CreateTask"
import { DownloadTask } from "@/features/DownloadTask"
import { Tooltip } from "antd"
import { useIntl } from "react-intl"
import { useState } from "react"
import { IProduct } from "@/entities/Product"
import { useFilteredProduct } from "@/entities/Product/model/useFilteredProduct"
import { useFilteredOperations } from "@/entities/Operations/model/useFilteredOperations"
import {
    useOperationFiltersStore,
    useSelectedOperationsStore,
} from "@/entities/Operations/model"
import { useExecutorsForDownload } from "./model/useExecutorsForDownload"
import { Can } from "@/shared/model"

const TaskLists = () => {
    const [selectedProductIds, setSelectedProductIds] = useState<number[]>([])
    const addOperations = useSelectedOperationsStore((state) => state.addOperations)
    const removeOperations = useSelectedOperationsStore(
        (state) => state.removeOperations,
    )
    const selectedOperations = useSelectedOperationsStore((state) => state.operations)

    const { products } = useFilteredProduct()
    const { filteredOperations } = useFilteredOperations()
    const { executorsForDownload, hasFormedOperations } = useExecutorsForDownload()
    const intl = useIntl()
    const isFormedFilterActive = useOperationFiltersStore((state) => state.isFormed)
    const createDisabled = selectedOperations.length === 0

    console.log(filteredOperations, "filtered ops")
    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="flex gap-3 items-center justify-between">
                <TopTaskListsFilters />
                <Can I="create" a="Task">
                    {!isFormedFilterActive ? (
                        createDisabled ? (
                            <Tooltip title={intl.formatMessage({ id: "noSelectedOperations" })}>
                                <span>
                                    <CreateTask disabled={true} />
                                </span>
                            </Tooltip>
                        ) : (
                            <CreateTask disabled={false} />
                        )
                    ) : (
                        hasFormedOperations ? (
                            <DownloadTask
                                executors={executorsForDownload}
                                hasFormedOperations={hasFormedOperations}
                            />
                        ) : (
                            <Tooltip title={intl.formatMessage({ id: "noSelectedOperations" })}>
                                <span>
                                    <DownloadTask
                                        executors={executorsForDownload}
                                        hasFormedOperations={hasFormedOperations}
                                    />
                                </span>
                            </Tooltip>
                        )
                    )}
                </Can>

            </div>

            <div className="grid grid-cols-[auto_1fr] gap-3">
                <FullExecutorList />
                <div className="flex flex-col gap-5">
                    <FullProductTable
                        products={products}
                        selectedRowKeys={selectedProductIds}
                        onChangeSelect={(rows: IProduct[]) => {
                            const newIds = rows.map((p) => p.id)
                            const addedIds = newIds.filter(
                                (id) => !selectedProductIds.includes(id),
                            )
                            const removedIds = selectedProductIds.filter(
                                (id) => !newIds.includes(id),
                            )

                            addOperations(
                                filteredOperations.filter((op) =>
                                    addedIds.includes(op.product.id),
                                ),
                            )
                            removeOperations(
                                filteredOperations.filter((op) =>
                                    removedIds.includes(op.product.id),
                                ),
                            )
                            setSelectedProductIds(newIds)
                        }}
                    />

                    <FullOperationsTable
                        operations={filteredOperations}
                        selectedProductIds={selectedProductIds}
                        onProductDeselect={(productId) => {
                            removeOperations(
                                filteredOperations.filter(
                                    (op) => op.product.id === productId,
                                ),
                            )
                            setSelectedProductIds((prev) =>
                                prev.filter((id) => id !== productId),
                            )
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default TaskLists
