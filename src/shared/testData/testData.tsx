// ===== Базовые справочники (подгружаются при входе) =====

import { IExecutor } from "@/entities/Executors/lib/ExecutorTypes"
import { ICatergory, IDepartment, ITypeOperation } from "../lib"
import { IEquipment } from "../lib/types/IEquipment"
import { IProduct } from "@/entities/Product"
import { IItinerary } from "@/entities/Itinerary"
import { IOperation } from "@/entities/Operations"

export const mockDepartments: IDepartment[] = [
	{ id: 1, name: "Цех механической обработки" },
	{ id: 2, name: "Сборочный цех" },
	{ id: 3, name: "Цех контроля качества" },
	{ id: 4, name: "Склад готовой продукции" },
]

export const mockCategories: ICatergory[] = [
	{ id: 1, name: "Токарные работы" },
	{ id: 2, name: "Фрезерные работы" },
	{ id: 3, name: "Сборка" },
	{ id: 4, name: "Контроль" },
	{ id: 5, name: "Упаковка" },
]

export const mockTypeOperations: ITypeOperation[] = [
	{ id: 1, name: "Основная" },
	{ id: 2, name: "Вспомогательная" },
	{ id: 3, name: "Контрольная" },
	{ id: 4, name: "Транспортная" },
]

export const mockEquipment: IEquipment[] = [
	{ id: 1, name: "Токарный станок CNC-200", operationTypeId: 1 },
	{ id: 2, name: "Фрезерный центр FMX-500", operationTypeId: 1 },
	{ id: 3, name: "Сборочная линия SL-100", operationTypeId: 2 },
	{ id: 4, name: "Координатно-измерительная машина", operationTypeId: 3 },
	{ id: 5, name: "Погрузчик электрический", operationTypeId: 4 },
]

export const mockProducts: IProduct[] = [
	{
		id: 1,
		name: 'Деталь "Вал приводной"',
		audCode: "VL-PRV-001",
		departmentId: 1,
		kit: 30,
		increasingKit: 150,
		// добавьте другие поля вашего IProduct
	},
	{
		id: 2,
		name: 'Узел "Редуктор в сборе"',
		audCode: "RD-SBR-045",
		departmentId: 1,
		kit: 30,
		increasingKit: 150,
	},
]

export const mockExecutors: IExecutor[] = [
	{
		id: 1,
		name: "Бригада №1 (Механообработка)",
		isBrigade: true,
		members: ["Иванов И.И.", "Петров П.П.", "Сидоров С.С."],
		department: mockDepartments[0],
		operations: [], // заполняется при связке
	},
	{
		id: 2,
		name: "Смирнов А.В.",
		isBrigade: false,
		members: ["Смирнов А.В."],
		department: mockDepartments[1],
		operations: [],
	},
	{
		id: 3,
		name: "Бригада ОТК",
		isBrigade: true,
		members: ["Козлова Е.М.", "Новиков Д.К."],
		department: mockDepartments[2],
		operations: [],
	},
]

// ===== Основные данные: Маршруты и Операции =====

export const mockItineraries: IItinerary[] = [
	{
		id: 101,
		product: mockProducts[0], // если используется расширенная версия интерфейса
		positionPlanId: 5001,
		audCode: "AUD-2024-001",
		audName: "Плановая партия №1",
		numberPositions: 50,
		kit: 10,
		increasingKit: 2,
		date: new Date("2024-04-15T08:00:00"),
		route: [1, 2, 3, 4], // ID цехов: механообработка → сборка → ОТК → склад
		operations: [], // заполняется ниже
	},
	{
		id: 102,
		product: mockProducts[1],
		positionPlanId: 5002,
		audCode: "AUD-2024-002",
		audName: "Срочный заказ №2",
		numberPositions: 25,
		kit: 5,
		increasingKit: 1,
		date: new Date("2024-04-16T10:30:00"),
		route: [2, 3, 4], // сборка → ОТК → склад
		operations: [],
	},
]

export const mockOperations: IOperation[] = [
	// === Маршрут 101 ===
	{
		id: 1001,
		product: mockProducts[0],
		itinerary: mockItineraries[0],
		department: mockDepartments[0],
		category: mockCategories[0],
		normTime: 45, // минут
		type: mockTypeOperations[0],
		numberPositions: 50,
		equipment: mockEquipment[0],
		isAssigned: true,
		executor: mockExecutors[0],
		paymentCoefficient: 1.2,
		award: 500,
		dateIssue: new Date("2024-04-15T08:00:00"),
		dateExecution: new Date("2024-04-15T12:30:00"),
		isFormed: false,
	},
	{
		id: 1002,
		product: mockProducts[0],
		itinerary: mockItineraries[0],
		department: mockDepartments[0],
		category: mockCategories[1],
		normTime: 60,
		type: mockTypeOperations[0],
		numberPositions: 50,
		equipment: mockEquipment[1],
		isAssigned: true,
		executor: mockExecutors[0],
		paymentCoefficient: 1.3,
		award: 700,
		dateIssue: new Date("2024-04-15T13:00:00"),
		dateExecution: undefined, // ещё не выполнена
		isFormed: false,
	},
	{
		id: 1003,
		product: mockProducts[0],
		itinerary: mockItineraries[0],
		department: mockDepartments[1],
		category: mockCategories[2],
		normTime: 30,
		type: mockTypeOperations[1],
		numberPositions: 50,
		equipment: mockEquipment[2],
		isAssigned: false,
		executor: mockExecutors[1],
		paymentCoefficient: 1.0,
		dateIssue: new Date("2024-04-16T09:00:00"),
		isFormed: false,
	},
	{
		id: 1004,
		product: mockProducts[0],
		itinerary: mockItineraries[0],
		department: mockDepartments[2],
		category: mockCategories[3],
		normTime: 20,
		type: mockTypeOperations[2],
		numberPositions: 50,
		equipment: mockEquipment[3],
		isAssigned: false,
		executor: mockExecutors[2],
		paymentCoefficient: 1.1,
		isFormed: false,
	},
	{
		id: 1005,
		product: mockProducts[0],
		itinerary: mockItineraries[0],
		department: mockDepartments[3],
		category: mockCategories[4],
		normTime: 15,
		type: mockTypeOperations[1],
		numberPositions: 50,
		isAssigned: false,
		executor: mockExecutors[1],
		isFormed: false,
	},

	// === Маршрут 102 ===
	{
		id: 2001,
		product: mockProducts[1],
		itinerary: mockItineraries[1],
		department: mockDepartments[1],
		category: mockCategories[2],
		normTime: 90,
		type: mockTypeOperations[0],
		numberPositions: 25,
		equipment: mockEquipment[2],
		isAssigned: true,
		executor: mockExecutors[1],
		paymentCoefficient: 1.5,
		award: 1200,
		dateIssue: new Date("2024-04-16T10:30:00"),
		dateExecution: new Date("2024-04-16T14:00:00"),
		isFormed: false,
	},
	{
		id: 2002,
		product: mockProducts[1],
		itinerary: mockItineraries[1],
		department: mockDepartments[2],
		category: mockCategories[3],
		normTime: 25,
		type: mockTypeOperations[2],
		numberPositions: 25,
		equipment: mockEquipment[3],
		isAssigned: true,
		executor: mockExecutors[2],
		paymentCoefficient: 1.1,
		award: 300,
		dateIssue: new Date("2024-04-16T14:30:00"),
		isFormed: false,
	},
	{
		id: 2003,
		product: mockProducts[1],
		itinerary: mockItineraries[1],
		department: mockDepartments[3],
		category: mockCategories[4],
		normTime: 10,
		type: mockTypeOperations[1],
		numberPositions: 25,
		isAssigned: false,
		executor: mockExecutors[1],
		isFormed: false,
	},
]

// ===== Связываем операции с маршрутами =====
mockItineraries[0].operations = mockOperations.filter(
	(op) => op.itinerary.id === 101,
)
mockItineraries[1].operations = mockOperations.filter(
	(op) => op.itinerary.id === 102,
)

// ===== Добавляем операции в исполнителей (опционально) =====
mockExecutors.forEach((executor) => {
	executor.operations = mockOperations.filter(
		(op) => op.executor?.id === executor.id,
	)
})
