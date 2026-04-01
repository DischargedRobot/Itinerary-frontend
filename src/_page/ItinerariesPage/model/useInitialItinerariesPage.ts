import { productAPI, useProductStore } from "@/entities/Product"
import { useCallback, useEffect } from "react";
import { mutate } from "swr"

export const useItinerariesPage = () => {
    const setProducts = useProductStore(state => state.setProducts);

    const loadProducts = useCallback(async (count = 100, page = 1) => {
        const serverProducts = await mutate(
            [['products', 'count', 'page'],['all',count,page]],
            () => productAPI.getProducts(count, page),
            {revalidate: false}
        );
        
        if (serverProducts) {
            setProducts(serverProducts);
        }
    }, [setProducts]);

    useEffect(() => {
        loadProducts(100, 1);
    }, [loadProducts]);
}