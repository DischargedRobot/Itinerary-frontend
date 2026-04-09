import { APIJSONRequest } from "@/shared/api"
import { IProduct } from "../lib"

// interface IProductResponse extends Omit<IProduct, 'kit' | 'increasingKit'> {
//     kitIncreasingKit: string
// }

export const productAPI = {
	getProducts: async (
		count: number = 100,
		page: number = 1,
	): Promise<IProduct[]> => {
		return await APIJSONRequest<IProduct[]>(
			`Products?count=${count}&page=${page}`,
		)

		// return (responseProducts.map(({kitIncreasingKit, ...product}) => {
		//     const kitAndIncreasingKit = kitIncreasingKit.split('/').map(parseInt)
		//     return {kit: kitAndIncreasingKit[0], increasingKit: kitAndIncreasingKit[0], ...product}
		// }))
	},
}
