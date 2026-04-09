"use client"

import { memo } from "react"
import { ProductTable } from "@/entities/Product"
import { IProduct } from "@/entities/Product/lib/ProductTypes"

interface FullProductTableProps {
	products: IProduct[]
}

const FullProductTable = ({ products }: FullProductTableProps) => {
	return <ProductTable products={products} />
}

export default memo(FullProductTable)
