'use client'

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
      width: 60,
      align: 'center',
    },
    {
      title: 'Цех',
      dataIndex: 'department',
      key: 'department',
      width: 80,
      render: (department: IDepartment) => <span> {department.name} </span>,
    },
    {
      title: 'Категория',
      dataIndex: 'category',
      key: 'category',
      width: 70,
      render: (category: ICatergory) => (category.name),
    },
    {
      title: 'Тип операции',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      ellipsis: true,
      render: (type: ITypeOperation) => (type.name),
    },
    {
      title: 'Норма времени',
      dataIndex: 'normTime',
      key: 'normTime',
      width: 90,
      align: 'right',
      render: (value: number) => `${value.toFixed(3)}`,
    },
    {
      title: 'Кол-во позиций',
      dataIndex: 'numberPositions',
      key: 'numberPositions',
      width: 80,
      align: 'center',
    },
    {
      title: 'Оборудование',
      dataIndex: 'equipment',
      key: 'equipment',
      width: 120,
      ellipsis: true,
      render: (equipment) => (equipment?.name),
    },
    {
      title: 'Назначена',
      dataIndex: 'isAssigned',
      key: 'isAssigned',
      width: 70,
      align: 'center',
    //   render: (checked: boolean) => <Checkbox checked={checked} disabled />,
    },
    {
      title: 'Состояние',
      key: 'status',
      width: 90,
      align: 'center',
    //   render: (_, record) => {
    //     const isClosed = record.dateExecution && record.executorId;
    //     const color = isClosed ? 'success' : record.isAssigned ? 'processing' : 'default';
    //     const text = isClosed ? 'закрыто' : record.isAssigned ? 'в работе' : 'открыто';
    //     return <Tag color={color}>{text}</Tag>;
    //   },
    },
    {
      title: 'Исполнитель',
      dataIndex: 'executor',
      key: 'executor',
      width: 100,
      render: (executor?: IExecutor) => (executor ? executor.name : ''),
    },
    {
      title: 'Коэфф.',
      dataIndex: 'paymentCoefficient',
      key: 'paymentCoefficient',
      width: 70,
      align: 'center',
      render: (value?: number) => value?.toFixed(2) || '',
    },
    {
      title: '% премии',
      dataIndex: 'award',
      key: 'award',
      width: 80,
      align: 'right',
      render: (value?: number) => value !== undefined ? `${value.toFixed(2)}%` : ' ',
    },
    {
      title: 'Дата выдачи',
      dataIndex: 'dateIssue',
      key: 'dateIssue',
      width: 100,
      render: (date?: Date) => date ? date.toLocaleDateString() : '',
    },
    {
      title: 'Дата исполнения',
      dataIndex: 'dateExecution',
      key: 'dateExecution',
      width: 110,
      render: (date?: Date) => date ? date.toLocaleDateString() : '',
    },
];

interface Props { 
    operations: IOperation[]
}
  
export const ItineraryOperationsTable = ({operations}: Props) => {

    console.log(operations)
    return(
        <Table
        className=""
            columns={columns}
            dataSource={operations}
            size="small"
            bordered
            pagination={false}
            rowKey={'id'}
            scroll={{ x: 1500 }}
        />
    )
}