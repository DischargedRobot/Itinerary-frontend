'use client'

import './ItineraryTable.scss'

import { ItineraryOperationsTable } from "@/entities/Operations"
import { useItineraryStore } from "../model"
import { Table } from "antd"
import { Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IProduct } from "@/entities/Product";
import { IItinerary } from "../lib";
import { useFilteredItineraries } from '../model/useFiltereditineraries'

export const getItineraryColumns = (): ColumnsType<IItinerary> => [
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
    width: 120,
    align: 'center',
    showSorterTooltip: false,
    sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    render: (date: Date) => date.toLocaleDateString(),
  },
  {
    title: 'Код ДСЕ',
    dataIndex: 'product',
    key: 'productCode',
    width: 180,
    render: (product: IProduct) => {
      return <span className="p-1 rounded-md border border-stroke bg-gray-100">{product?.audCode || '—'}</span>;
    },
  },
  {
    title: 'Наименование ДСЕ',
    dataIndex: 'product',
    key: 'productName',
    width: 150,
    render: (product: IProduct) => {
      return <span>{product?.name || ''}</span>;
    },
  },
  {
    title: 'N',
    dataIndex: 'numberPositions',
    key: 'numberPositions',
    width: 100,
    align: 'right',
    showSorterTooltip: false,
    sorter: (a, b) => a.numberPositions - b.numberPositions,
    render: (value: number) => value,
  },
  {
    title: 'Комплект',
    key: 'kit',
    width: 100,
    align: 'center',
    render: (_, record) => (
      <span>
        {record.kit}/{record.kit + record.increasingKit || 151}
      </span>
    ),
  },
  {
    title: 'Маршрут',
    dataIndex: 'route',
    key: 'route',
    width: 200,
    render: (route: number[]) => {
      if (!route?.length) return '—';
      
      // Показываем маршрут как строку с дефисами
      const routeString = route.join('-');
      
      // Если маршрут длинный, обрезаем с многоточием
      if (routeString.length > 20) {
        return (
          <Tag color="geekblue" style={{ maxWidth: 180 }}>
            {routeString.substring(0, 20)}...
          </Tag>
        );
      }
      
      return <Tag color="geekblue">{routeString}</Tag>;
    },
  },
];
export const ItineraryTable = () => {

    

    const itineraries = useFilteredItineraries()

    return (
        // <ItineraryOperationsTable operations={itineraries[0].operations}/>
        <Table
            columns={getItineraryColumns()}
            size='small'
            className="itinerary-table"
            rowKey={'id'}
            dataSource={itineraries}
            pagination={{placement: ['bottomCenter'], pageSize: 20}}
            expandable={{
              expandedRowRender: (itinerary) => 
                  <ItineraryOperationsTable operations={itinerary.operations}/>
            }}
            
            // scroll={{x: true}}
        />
        
    )
}