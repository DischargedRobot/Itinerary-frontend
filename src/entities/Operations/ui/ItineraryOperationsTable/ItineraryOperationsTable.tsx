'use client'

import './ItineraryOperationTable.scss'

import { Table } from "antd"
import { IOperation } from "../../lib";
import { ColumnsType } from "antd/es/table";
import { IDepartment, IExecutor } from "@/entities/Executors/lib/ExecutorTypes";
import { ICatergory, ITypeOperation } from "@/shared";
const columns: ColumnsType<IOperation> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '45px',
      align: 'center',
    },
    {
      title: 'Цех',
      dataIndex: 'department',
      key: 'department',
      ellipsis: true,
      width: 55,
      render: (department) => <div className='max-w-13.75 overflow-hidden whitespace-nowrap text-ellipsis'>{department.name}</div>, 
    },
    {
      title: 'Тип операции',
      dataIndex: 'type',
      key: 'type',
      width: '100px',
      ellipsis: true,
      render: (type: ITypeOperation) => (type.name),
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: '90px',
      render: (category: ICatergory) => (category.name),
    },
    {
      title: 'Норма времени',
      dataIndex: 'normTime',
      key: 'normTime',
      width: '80px',
      align: 'right',
      render: (value: number) => `${value.toFixed(3)}`,
    },
    {
      title: 'Кол-во позиций',
      dataIndex: 'numberPositions',
      key: 'numberPositions',
      width: '80px',
      align: 'right',
    },
    {
      title: 'Оборудование',
      dataIndex: 'equipment',
      key: 'equipment',
      width: '100px',
      ellipsis: true,
      render: (equipment) => <div className='max-w-25 overflow-hidden whitespace-nowrap text-ellipsis'>{equipment?.name}</div>,
    },
    {
      title: 'Назначена',
      dataIndex: 'isAssigned',
      key: 'isAssigned',
      width: '75px',
      align: 'center',
    //   render: (checked: boolean) => <Checkbox checked={checked} disabled />,
    },
    {
      title: 'Исполнитель',
      dataIndex: 'executor',
      key: 'executor',
      ellipsis: true,
      align: 'left',
      width: 110,
      render: (executor?: IExecutor) => <div style={{overflow: 'hidden', maxWidth: 110, whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{executor ? executor.name : ''}</div>,
    },
    {
      title: 'Коэффцициент',
      dataIndex: 'paymentCoefficient',
      key: 'paymentCoefficient',
      width: '90px',
      align: 'right',
      render: (value?: number) => value?.toFixed(2) || '',
    },
    {
      title: '% премии',
      dataIndex: 'award',
      key: 'award',
      width: '70px',
      align: 'right',
      render: (value?: number) => value !== undefined ? `${value.toFixed(0)}%` : ' ',
    },
    {
      title: 'Дата выдачи',
      dataIndex: 'dateIssue',
      key: 'dateIssue',
      width: '100px',
      render: (date?: Date) => date ? date.toLocaleDateString() : '',
    },
    {
      title: 'Дата исполнения',
      dataIndex: 'dateExecution',
      key: 'dateExecution',
      width: '100px',
      render: (date?: Date) => date ? date.toLocaleDateString() : '',
    },
];

interface Props { 
    operations: IOperation[]
}
  
export const ItineraryOperationsTable = ({operations}: Props) => {

    return(
      <div className='max-w-200 overflow-hidden'>
        <div className='overflow-x-auto'>
          <Table
              columns={columns}
              dataSource={operations}
              size='small'
              rowClassName='text text_tiny text_2very-litle max-h-5.5 overflow-hidden'
              className="itinerary-operation-table"
              tableLayout='fixed'
              pagination={false}
              rowKey={'id'}
              scroll={{ x: true, y: 100 }}
          />
        </div>
      </div>
    )
}