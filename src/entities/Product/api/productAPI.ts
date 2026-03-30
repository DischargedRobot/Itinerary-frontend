import { APIJSONRequest } from "@/shared/api"
import { IProduct } from "../lib"

interface IProductResponse extends Omit<IProduct, 'kit' | 'increasingKit'> {
    kitIncreasingKit: string
}

export const productAPI = {

    getProducts: async(): Promise<IProduct[]> => {
        const responseProducts = await APIJSONRequest<IProductResponse>('Products')

        return (responseProducts.map(({kitIncreasingKit, ...product}) => {
            const kitAndIncreasingKit = kitIncreasingKit.split('/').map(parseInt)
            return {kit: kitAndIncreasingKit[0], increasingKit: kitAndIncreasingKit[0], ...product}
        }))
    }

}