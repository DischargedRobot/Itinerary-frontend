'use client'

import { Table, TableProps } from "antd"
import { useProductTable } from "../model"
import { IProduct } from "../lib"

const createColumns= (

): TableProps<IProduct>['columns']  => ([
    {
        key: 'Code',
        title: 'Код',
        dataIndex: 'audCode',
    },
    {
        key: 'Name',
        title: 'Наименование',
        dataIndex: 'name',
    },
    {
        key: 'KitAndIncreasinKit',
        title: 'Комплект/Нарастающий',
        render: (_, product) => {
            return `${product.kit}/${product.increasingKit}`
        }
    }
])

export const ProductTable = () => {

    const {
        products
    } = useProductTable()

    return (
        <Table
            size="small"
            pagination={{placement: ["bottomCenter"],pageSize: 7}}
            columns={createColumns()}
            rowSelection={{type: 'checkbox'}}
            dataSource={products}
            rowKey={'id'}
        />
    )
}