import { APIJSONRequest } from "@/shared/api"
import { IPlanPosition } from "../lib"

export const planPositionAPI = {
	getPlanPositionsByProduct: async (
		productId: number,
	): Promise<IPlanPosition[]> => {
		const planPosotions = await APIJSONRequest<IPlanPosition>(
			`PlanPositions/by-product/${productId}`,
		)

		return planPosotions.map(
			({ startedDate, finishedDate, ...planPos }) => ({
				...planPos,
				startedDate: new Date(startedDate),
				finishedDate: new Date(finishedDate),
			}),
		)
	},
}
