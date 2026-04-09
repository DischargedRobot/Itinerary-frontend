"use client"

import "./OperationTable.scss"

import { Table, TableProps } from "antd"
import { useOperationTable } from "../../model/useOperationTable"
import { IOperation } from "../../lib"
import { DownOutlined } from "@ant-design/icons"
import { IProduct } from "@/entities/Product"
import { FormattedMessageWithValues } from "@/shared/lang/FormattedMessageWithValues"

const createColumn = (): TableProps<IOperation>["columns"] => [
	{
		key: "typeOperation",
		title: <FormattedMessageWithValues id="operation" />,
		dataIndex: "name",
		ellipsis: true,
	},
	{
		key: "product",
		title: <FormattedMessageWithValues id="product" />,
		dataIndex: "product",
		render: (product: IProduct) => {
			return `${product.name}`
		},
		ellipsis: true,
	},
	{
		key: "numberPositions",
		title: <FormattedMessageWithValues id="number" />,
		dataIndex: "numberPositions",
	},
	{
		key: "dateExecution",
		title: <FormattedMessageWithValues id="dateExecution" />,
		dataIndex: "dateExecution",
	},
	{
		key: "normTime",
		title: <FormattedMessageWithValues id="normTime" />,
		dataIndex: "normTime",
	},
	{
		key: "pymentCoefficient",
		title: <FormattedMessageWithValues id="paymentCoefficient2" />,
		dataIndex: "pymentCoefficient",
	},
	{
		key: "x2",
		title: <FormattedMessageWithValues id="x2" />,
		render: () => {
			return <input type="checkbox" />
		},
	},
	{
		key: "award",
		title: <FormattedMessageWithValues id="awardPercent" />,
		dataIndex: "award",
	},
]

export const OperationTable = () => {
	const {
		operations,
		setIsVisible,
		isVisible,
		handleRowUnSelect,
		handleRowSelect,
	} = useOperationTable()

	return (
		<Table
			rowSelection={{
				onSelect: (operation, selected) => {
					if (selected) {
						handleRowSelect(operation)
					} else {
						handleRowUnSelect(operation)
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
			columns={createColumn()}
			dataSource={operations}
			rowKey={"id"}
		/>
	)
}
