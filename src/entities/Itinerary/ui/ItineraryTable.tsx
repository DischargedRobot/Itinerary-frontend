'use client'

import { ItineraryOperationsTable } from "@/entities/Operations"
import { useItineraryStore } from "../model"
import { Table } from "antd"



export const ItineraryTable = () => {

    const itineraries = useItineraryStore(state => state.itineraries)

    return (
        <Table
            rowKey={'id'}
            dataSource={itineraries}
            expandable={{
                expandedRowRender: (itinerary) => 
                    <ItineraryOperationsTable operations={itinerary.operations}/>
                }}
        />
        
    )
}