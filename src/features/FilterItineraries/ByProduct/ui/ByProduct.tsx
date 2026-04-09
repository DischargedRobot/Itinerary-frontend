"use client"

import { useIntl } from "react-intl"
import { Select } from "antd"
import { useByProduct } from "../model"

export const ByProduct = () => {
	const { products, handleSelect } = useByProduct()
	const intl = useIntl()

	return (
		<Select
			placeholder={intl.formatMessage({ id: "product" })}
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
