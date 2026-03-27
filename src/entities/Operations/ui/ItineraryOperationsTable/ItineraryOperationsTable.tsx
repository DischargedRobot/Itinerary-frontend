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
      width: '75px',
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
      render: (equipment) => (equipment?.name),
    },
    {
      title: 'Назначена',
      dataIndex: 'isAssigned',
      key: 'isAssigned',
      width: '75px',
      align: 'center',
    //   render: (checked: boolean) => <Checkbox checked={checked} disabled />,
    },
    // {
    //   title: 'Состояние',
    //   key: 'status',
    //   width: '75px',
    //   align: 'center',
    //   render: (status, _) => {}
    // //   render: (_, record) => {
    // //     const isClosed = record.dateExecution && record.executorId;
    // //     const color = isClosed ? 'success' : record.isAssigned ? 'processing' : 'default';
    // //     const text = isClosed ? 'закрыто' : record.isAssigned ? 'в работе' : 'открыто';
    // //     return <Tag color={color}>{text}</Tag>;
    // //   },
    // },
    {
      title: 'Исполнитель',
      dataIndex: 'executor',
      key: 'executor',
      ellipsis: true,
      align: 'left',
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
        <Table
            columns={columns}
            dataSource={operations}
            size='small'
            rowClassName='text t text_tiny text_very-litle max-h-5.5 overflow-hidden'
            className="itinerary-operation-table "
            tableLayout='fixed'
            pagination={false}
            rowKey={'id'}
            scroll={{ x: 'max-content', y: 55 * 5 }}
        />
    )
}