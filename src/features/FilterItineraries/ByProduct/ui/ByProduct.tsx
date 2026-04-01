'use client'

import { Select } from "antd"
import { useByProduct } from "../model"

export const ByProduct = () => {

    const { 
        products,
        handleSelect,
    } = useByProduct()

    return(
        <Select 
            options={products}
            onSelect={handleSelect}
        />
    )
}