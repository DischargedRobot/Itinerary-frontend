"use client"

import "./ProductTable.scss"

import { Table, TableProps } from "antd"
import { useProductTable } from "../model"
import { IProduct } from "../lib"
import { DownOutlined } from "@ant-design/icons"

const createColumns = (): TableProps<IProduct>["columns"] => [
	{
		key: "Code",
		title: "Код",
		dataIndex: "audCode",
		ellipsis: true,
		width: "30%",
	},
	{
		key: "Name",
		title: "Наименование",
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

export const ProductTable = () => {
	const { products, isVisible, setIsVisible } = useProductTable()

	return (
		<Table
			footer={() => <></>}
			title={() => (
				<div
					onClick={() => setIsVisible((prev) => !prev)}
					className="product-table__title flex justify-between"
				>
					<span>Изделия</span>
					<DownOutlined
						className={`${isVisible ? "" : "arrow_collapsed"}`}
					/>
				</div>
			)}
			size="small"
			className={`product-table ${isVisible ? "" : "collapsed"}`}
			pagination={{ placement: ["bottomCenter"], pageSize: 7 }}
			columns={createColumns()}
			rowSelection={{ type: "checkbox" }}
			dataSource={products}
			rowKey={"id"}
		/>
	)
}
