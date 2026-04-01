import { APIJSONRequest } from "@/shared/api"
import { IPlanPosition } from "../lib"

export const planPositionAPI = {

    getPlanPositionsByProduct: async(productId: number): Promise<IPlanPosition[]> => {
        return APIJSONRequest(`PlanPositions/by-product/${productId}`)
    }

}