"use client"

import { Select } from "antd"
import { useByProduct } from "../model"

export const ByProduct = () => {
	const { products, handleSelect } = useByProduct()

	return (
		<Select
			placeholder="Изделие"
			className="w-40"
			size="medium"
			options={products.map((product) => ({
				value: product.id,
				label: product.id,
			}))}
			onSelect={handleSelect}
		/>
	)
}
