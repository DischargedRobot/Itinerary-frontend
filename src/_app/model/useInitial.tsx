import { categoryAPI, useCategoriesStore } from "@/entities/Category"
import { departmentAPI, useDepartmentStore } from "@/entities/Department"
import {
	equipmentAPI,
	equipmentAPIUtilities,
	useEquipmentStore,
} from "@/entities/Equipment"
import { useExecutorsStore } from "@/entities/Executors"
import { executorsAPI } from "@/entities/Executors"
import { operationTypeAPI } from "@/entities/OperationType"
import { useOperationTypeStore } from "@/entities/OperationType/model"
import { productAPI, useProductStore } from "@/entities/Product"
import { PromiseAllNamed } from "@/shared/api"
import { mapAPIError } from "@/shared/api/apiError"
import { IEquipment } from "@/shared/lib"
import { useEffect } from "react"
import useSWR from "swr"

export const useInitial = () => {
	const setExecutors = useExecutorsStore((state) => state.setExecutors)
	const setCategories = useCategoriesStore((state) => state.setCategories)
	const setDepartments = useDepartmentStore((state) => state.setDepartments)
	const setEquipment = useEquipmentStore((state) => state.setEquipments)
	const setProducts = useProductStore((state) => state.setProducts)
	const setOperationsTypes = useOperationTypeStore(
		(state) => state.setOperationsTypes,
	)

	// const { data: categories, error: categoriesError } = useSWR('/api/categories', () => categoryAPI.getCategories());
	// const { data: equipments, error: equipmentsError } = useSWR('/api/equipments', () => equipmentAPI.getEquipments());
	// const { data: products, error: productsError } = useSWR('/api/products', () => productAPI.getProducts());
	// const { data: operationsTypes, error: operationsTypesError } = useSWR('/api/operations-types', () => operationTypeAPI.getOperationsTypes());
	// const { data: departments, error: departmentsError } = useSWR('/api/departments', () => departmentAPI.getDepartments());

	// TODO: А нужен ли тут кеш?
	// useSWR([['allData']],
	//     () => PromiseAllNamed({
	//         categories: categoryAPI.getCategories(),
	//         equipments: equipmentAPI.getEquipments(),
	//         products: productAPI.getProducts(),
	//         operationsTypes: operationTypeAPI.getOperationsTypes(),
	//         // executorsAPI.getExecutors().then(resolve => executors = resolve),
	//         departments: departmentAPI.getDepartments(),
	//     }).then(({equipments, operationsTypes, products, categories, departments}) => {
	//         setCategories(categories)
	//         // setEquipment(equipments)
	//         setProducts(products)
	//         setOperationsTypes(operationsTypes)
	//         setDepartments(departments)
	//     })
	// )

	useEffect(() => {
		PromiseAllNamed({
			categories: categoryAPI.getCategories(),
			equipments: equipmentAPI.getEquipments(),
			// products: productAPI.getProducts(),
			operationsTypes: operationTypeAPI.getOperationsTypes(),
			// executorsAPI.getExecutors().then(resolve => executors = resolve),
			departments: departmentAPI.getDepartments(),
		}).then(
			({
				equipments,
				operationsTypes,
				// products,
				categories,
				departments,
			}) => {
				setCategories(categories)
				// setProducts(products)
				setOperationsTypes(operationsTypes)
				console.log(departments, "depsss")
				setDepartments(departments)
				const res = equipmentAPIUtilities.enrichEquipmentResponse(
					equipments,
					operationsTypes,
				)
				console.log(res, "res")
				setEquipment(res)
			},
		)
		// Promise.all([
		//     categoryAPI.getCategories().then(resolve => console.log(resolve)),
		//     equipmentAPI.getEquipments().then(equipments => console.log(equipments)),
		//     productAPI.getProducts().then(products => console.log(products)),
		//     // executorsAPI.getExecutors().then(resolve => executors = resolve),
		//     departmentAPI.getDepartments().then(resolve => setDepartments(resolve)),
		// ]).then(resolves => setDepartments(resolves))
		// .catch(reject => console.log(reject))
		// console.log(executors, departments)
	}, [])

	return {}
}
