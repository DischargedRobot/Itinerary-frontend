import { useEffect, useState } from "react"
import { IProduct, useProductStore } from "@/entities/Product"
import {
	useOperationStore,
	useSelectedOperationsStore,
} from "./createOperationStore"
import { IOperation, isIOperation } from "../lib"
import { useSelectedExecutorsStore } from "@/entities/Executors/model"

export const useOperationTable = (filteredOperations: IOperation[]) => {
	const [isVisible, setIsVisible] = useState<boolean>()
	const setProducts = useProductStore((state) => state.setProducts)
	// TODO: мб перенести в сторе продуктов? но тогда он будет зависимым от другого стора, хм...

	const addSelectedOperation = useSelectedOperationsStore(
		(state) => state.addOperations,
	)
	const removeSelectedOperation = useSelectedOperationsStore(
		(state) => state.removeOperations,
	)

	useEffect(() => {
		setProducts(
			filteredOperations
				.map<IProduct>(
					(filteredOperations) => filteredOperations.product,
				)
				.reduce<{ currentIds: number[]; uniqProduct: IProduct[] }>(
					(currentProduct, product) => {
						console.log(product, "product in useTable")
						if (!currentProduct.currentIds.includes(product.id)) {
							currentProduct.currentIds.push(product.id)
							currentProduct.uniqProduct.push(product)
							console.log("cur", currentProduct)
						}
						return currentProduct
					},
					{
						currentIds: [],
						uniqProduct: [],
					},
				).uniqProduct,
		)
	}, [setProducts, filteredOperations])

	const selectedExecutors = useSelectedExecutorsStore(
		(state) => state.selectedExecutors,
	)
	// если мы изменяем фильтры, то обновляем операции
	// Сделать так, чтобы при
	const setOperations = useOperationStore((state) => state.setOperations)
	useEffect(() => {
		setOperations(
			selectedExecutors.reduce<IOperation[]>((allOperations, exec) => {
				exec.operations.forEach((oper) => {
					if (isIOperation(oper) && oper.isFormed) {
						allOperations.push(oper)
					}
				})
				return allOperations
			}, []),
		)
	}, [selectedExecutors, setOperations])

	return {
		isVisible,
		setIsVisible,
		handleRowSelect: (operation: IOperation) =>
			addSelectedOperation([operation]),
		handleRowUnSelect: (operation: IOperation) =>
			removeSelectedOperation([operation]),
	}
}
