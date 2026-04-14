"use client"

import { memo } from "react"
import { ProductTable } from "@/entities/Product"
import { IProduct } from "@/entities/Product/lib/ProductTypes"

interface FullProductTableProps {
	products: IProduct[]
	selectedRowKeys?: number[]
	onChangeSelect?: (selectedRows: IProduct[]) => void
}

const FullProductTable = ({ products, selectedRowKeys, onChangeSelect }: FullProductTableProps) => {
	return <ProductTable products={products} selectedRowKeys={selectedRowKeys} onChangeSelect={onChangeSelect} />
}

export default memo(FullProductTable)
