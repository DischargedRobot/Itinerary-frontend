import { IProduct } from "@/entities/Product"

export interface IPlanPosition { 
    id: number
    productId: IProduct['id']
    startedDate: Date
    finishedDate: Date
}