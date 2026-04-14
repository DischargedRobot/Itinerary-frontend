"use client"

import "./ProductTable.scss"

import { Table, TableProps } from "antd"
import { useProductTable } from "../model"
import { IProduct } from "../lib"
import { DownOutlined } from "@ant-design/icons"
import { FormattedMessageWithValues } from "@/shared/lang/FormattedMessageWithValues"

const createColumns = (): TableProps<IProduct>["columns"] => [
	{
		key: "Code",
		title: <FormattedMessageWithValues id="productCode2" />,
		dataIndex: "audCode",
		ellipsis: true,
		width: "30%",
	},
	{
		key: "Name",
		title: <FormattedMessageWithValues id="productName2" />,
		dataIndex: "name",
		ellipsis: true,
		width: "70%",
	},
	// {
	//     key: 'KitAndIncreasinKit',
	//     title: 'Комплект/Нарастающий',
	//     render: (_, product) => {
	//         return `${product.kit}/${product.increasingKit}`
	//     }
	// }
]

interface ProductTableProps {
	products: IProduct[]
	selectedRowKeys?: number[]
	onChangeSelect?: (selectedRows: IProduct[]) => void
}

export const ProductTable = ({ products, selectedRowKeys, onChangeSelect }: ProductTableProps) => {
	const { isVisible, setIsVisible } = useProductTable()

	return (
		<Table
			footer={() => <></>}
			title={() => (
				<div
					onClick={() => setIsVisible((prev) => !prev)}
					className="product-table__title flex justify-between"
				>
					<span>
						<FormattedMessageWithValues id="products" />
					</span>
					<DownOutlined
						className={`${isVisible ? "" : "arrow_collapsed"}`}
					/>
				</div>
			)}
			size="small"
			className={`product-table w-full ${isVisible ? "" : "collapsed"}`}

			pagination={{ placement: ["bottomCenter"], pageSize: 7 }}
			columns={createColumns()}
			rowSelection={{
				type: "checkbox",
				selectedRowKeys: selectedRowKeys ?? [],
				onChange: (_, selectedRows) => onChangeSelect?.(selectedRows),
			}}
			dataSource={products}
			rowKey={"id"}
		/>
	)
}
