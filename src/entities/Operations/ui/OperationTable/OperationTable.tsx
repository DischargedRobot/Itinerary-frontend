"use client"

import "./OperationTable.scss"
import "react-resizable/css/styles.css"
import { memo, useMemo, useState, useCallback, ThHTMLAttributes, type FC } from "react"
import { Table, TableColumnType } from "antd"
import { Resizable, ResizeCallbackData } from "react-resizable"
import { useOperationTable } from "../../model/useOperationTable"
import { useSelectedOperationsStore } from "../../model"
import { IOperation } from "../../lib"
import { DownOutlined } from "@ant-design/icons"
import { IProduct } from "@/entities/Product"
import { FormattedMessageWithValues } from "@/shared/lang/FormattedMessageWithValues"

interface ResizableTitleProps extends ThHTMLAttributes<HTMLElement> {
	onResize?: (e: React.SyntheticEvent, data: ResizeCallbackData) => void
	width?: number
}

const ResizableTitle = ({ onResize, width, ...restProps }: ResizableTitleProps) => {
	if (!width) return <th {...restProps} />
	return (
		<Resizable
			width={width}
			height={0}
			onResize={onResize!}
			draggableOpts={{ enableUserSelectHack: false }}
		>
			<th {...restProps} />
		</Resizable>
	)
}

type ColumnWithWidth = TableColumnType<IOperation> & { width?: number }

type DateRendererProps = {
	defaultDate?: Date | undefined
	onSelect: (date: Date | undefined) => void
}

const initialColumns = (DateRenderer: FC<DateRendererProps>): ColumnWithWidth[] => [
	{
		key: "typeOperation",
		title: <FormattedMessageWithValues id="operation" />,
		dataIndex: "name",
		ellipsis: true,
		width: 160,
	},
	{
		key: "product",
		title: <FormattedMessageWithValues id="product" />,
		dataIndex: "product",
		render: (product: IProduct) => product.name,
		ellipsis: true,
		width: 160,
	},
	{
		key: "numberPositions",
		title: <FormattedMessageWithValues id="number" />,
		dataIndex: "numberPositions",
		ellipsis: true,
		width: 80,
	},
	{
		key: "dateExecution",
		title: <FormattedMessageWithValues id="dateExecution" />,
		render: (date: Date | undefined, operation: IOperation) => {
			console.log(date, "date in render", operation)
			return (
				<DateRenderer defaultDate={date} onSelect={(date) => { operation.dateExecution = date }} />
			)
		},
		dataIndex: "dateExecution",
		width: 120,
		ellipsis: true,
	},
	{
		key: "normTime",
		title: <FormattedMessageWithValues id="normTime" />,
		dataIndex: "normTime",
		ellipsis: true,
		width: 80,
	},
	{
		key: "pymentCoefficient",
		title: <FormattedMessageWithValues id="paymentCoefficient2" />,
		dataIndex: "pymentCoefficient",
		width: 80,
		ellipsis: true,
	},
	{
		key: "x2",
		title: <FormattedMessageWithValues id="x2" />,
		render: () => <input type="checkbox" />,
		width: 60,
		ellipsis: true,
	},
	{
		key: "award",
		title: <FormattedMessageWithValues id="awardPercent" />,
		dataIndex: "award",
		width: 80,
		ellipsis: true,
	},
]

interface Props {
	operations: IOperation[]
	selectedProductIds?: number[]
	onProductDeselect?: (productId: number) => void
	DateRenderer?: FC<DateRendererProps>
}

const OperationTable = ({
	operations,
	selectedProductIds,
	onProductDeselect,
	DateRenderer,
}: Props) => {
	const { setIsVisible, isVisible, handleRowUnSelect, handleRowSelect } =
		useOperationTable(operations)

	const selectedOperations = useSelectedOperationsStore((state) => state.operations)
	const selectedRowKeys = useMemo(
		() => selectedOperations.map((op) => op.id),
		[selectedOperations],
	)

	const addOperations = useSelectedOperationsStore((state) => state.addOperations)
	const removeOperations = useSelectedOperationsStore((state) => state.removeOperations)

	const [columns, setColumns] = useState<ColumnWithWidth[]>(() =>
		initialColumns(
			DateRenderer ??
			(({ defaultDate, onSelect }: DateRendererProps) => (
				<span onClick={() => onSelect(defaultDate ?? new Date())}>
					{defaultDate ? defaultDate.toLocaleDateString() : ""}
				</span>
			)) as FC<DateRendererProps>,
		),
	)

	const handleResize = useCallback(
		(index: number) =>
			(_: React.SyntheticEvent, { size }: ResizeCallbackData) => {
				setColumns((prev) => {
					const next = [...prev]
					next[index] = { ...next[index], width: size.width }
					return next
				})
			},
		[],
	)

	const mergedColumns = columns.map<ColumnWithWidth>((col, index) => ({
		...col,
		onHeaderCell: (column: TableColumnType<IOperation>) => ({
			width: typeof column.width === "number" ? column.width : undefined,
			onResize: handleResize(index),
		}),
	}))

	return (
		<Table
			components={{ header: { cell: ResizableTitle } }}
			rowSelection={{
				selectedRowKeys,
				onSelect: (operation, selected) => {
					if (selected) {
						handleRowSelect(operation)
					} else {
						handleRowUnSelect(operation)
						if (selectedProductIds?.includes(operation.product.id)) {
							onProductDeselect?.(operation.product.id)
						}
					}
				},
				onSelectAll: (selected, _, changeRows) => {
					if (selected) {
						addOperations(changeRows)
					} else {
						removeOperations(changeRows)
					}
				},
			}}
			footer={() => <></>}
			title={() => (
				<div
					onClick={() => setIsVisible((prev) => !prev)}
					className="operation-table__title w-full flex justify-between"
				>
					<span>
						<FormattedMessageWithValues id="operation" />
					</span>
					<DownOutlined
						className={`${isVisible ? "" : "arrow_collapsed"}`}
					/>
				</div>
			)}
			className={`operation-table w-full rounded-2xl ${isVisible ? "" : "collapsed"}`}
			size="small"
			pagination={{ placement: ["bottomCenter"], pageSize: 7 }}
			columns={mergedColumns}
			dataSource={operations}
			rowKey={"id"}
		/>
	)
}

export default memo(OperationTable)
