import { planPositionAPI, usePlanPositionStore } from "@/entities/PlanPosition"
import { IPlanPosition } from "@/entities/PlanPosition/lib"
import { IProduct, useProductStore } from "@/entities/Product"
import { getCachedData } from "@/shared"
import { mapAPIError } from "@/shared/api/apiError"
import { useSWRConfig } from "swr"


export const useByProduct = () => {

    const { cache } = useSWRConfig()
    const products = useProductStore(state => state.products)
    const setPlanPositions = usePlanPositionStore(state => state.setPlanPositions)

    const getCachedPlanPositions = async (productId: number): Promise<IPlanPosition[]> => {
        const cacheKey = [['planPositions', 'productId'],['all', productId]].toString();

        const serverPlanPositions = getCachedData(
            cache,
            cacheKey,
            () => planPositionAPI.getPlanPositionsByProduct(productId),
        )

        if (!serverPlanPositions) {
            throw mapAPIError(404)
        }

        return serverPlanPositions ;
    };

    const handleSelect = async (product: IProduct) => {

        const planPositions = await getCachedPlanPositions(product.id);
        
        if (planPositions) {
            setPlanPositions(planPositions)
        }

    }
    return {
        products,
        handleSelect
    }
}