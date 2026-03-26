'use client'

import './OperationTable.scss'

import { Table, TableProps } from "antd"
import { useOperationTable } from "../model/useOperationTable"
import { IOperation } from "../lib"
import { IItinerary } from "@/entities/Itinerary"

const createColumn = (

): TableProps<IOperation>['columns'] => ([
    {
        key: 'typeOperation',
        title: 'Операция',
        dataIndex: 'typeId'
    },
    {
        key: 'itinerary',
        title: 'Операция',
        dataIndex: 'itinerary',
        render: (itinerary: IItinerary) => {
            return `${itinerary.audName}`
        }
    },
    {
        key: 'numberPositions',
        title: 'N',
        dataIndex: 'numberPositions'
    },
    {
        key: 'dateExecution',
        title: 'Дата исполнения',
        dataIndex: 'dateExecution'
    },
    {
        key: 'normTime',
        title: 'Норма времени',
        dataIndex: 'normTime'
    },
    {
        key: 'pymentCoefficient',
        title: 'К',
        dataIndex: 'pymentCoefficient'
    },
    {
        key: 'x2',
        title: 'x2',
        render: () => {
            return <input type="checkbox"/>
        }
    },
    {
        key: 'award',
        title: '% Премия',
        dataIndex: 'award',
    },
])

export const OperationTable = () => {

    const {operations} = useOperationTable()

    return (
        <Table
            className="operation-table"
            size="small"
            pagination={{placement: ['bottomCenter'],pageSize: 7}}
            columns={createColumn()}
            dataSource={operations}
            rowKey={'id'}
        />
    )
}