import { LOCALES } from "./lolales"

export type MessagesWithoutVaribles = {
	save: string
	choose: string
	cancle: string
	create: string
	date: string
	productCode: string
	productName: string
	number: string
	kit: string
	route: string
	id: string
	department: string
	operationType: string
	category: string
	normTime: string
	equipment: string
	executor: string
	paymentCoefficient: string
	award: string
	dateIssue: string
	dateExecution: string
	operation: string
	product: string
	paymentCoefficient2: string
	x2: string
	awardPercent: string
	productCode2: string
	productName2: string
	products: string
	loginPlaceholder: string
	passwordPlaceholder: string
	fieldRequired: string
	itineraries: string
	tasklists: string
	profile: string
	passwordMinLength: string
	brigade: string
	members: string
	formedOrders: string
	login: string
	clear: string
	selectPlaceholder: string
	email: string
	phone: string
	name: string
	secondName: string
	middleName: string
	warning: string
	success: string
	error: string
	networkError: string
	badRequestError: string
	unauthorizedError: string
	forbiddenError: string
	notFoundError: string
	serverError: string
	unknownError: string
	invalidCredentials: string
	noOperations: string
	serverRequestError: string
	unknownErrorOccurred: string
	selectDate: string
	department_placeholder: string
	download_report: string
}

export type MessageVariables = {
	itemAdded: { item: string }
	priceDisplay: { price: number }
	dateFormat: { date: Date }
}

export type MessagesWithVaribles = {
	[M in keyof MessageVariables]: string
}

export type AllMessage = MessagesWithoutVaribles & MessagesWithVaribles

type TMessages = {
	[K in (typeof LOCALES)[keyof typeof LOCALES]]: Partial<AllMessage>
}

export const messages: TMessages = {
	[LOCALES.RUSSIAN]: {
		save: "Сохранить",
		choose: "Выбрать",
		cancle: "Оменить",
		create: "Сформировать",
		itemAdded: "Добавлено: {item}",
		date: "Дата",
		productCode: "Код ДСЕ",
		productName: "Наименование ДСЕ",
		number: "N",
		kit: "Комплект",
		route: "Маршрут",
		id: "ID",
		department: "Цех",
		operationType: "Тип операции",
		category: "Категория",
		normTime: "НВ",
		equipment: "Оборудование",
		executor: "Исполнитель",
		paymentCoefficient: "К",
		award: "% премии",
		dateIssue: "Дата выдачи",
		dateExecution: "Дата исполнения",
		operation: "Операция",
		product: "Изделие",
		paymentCoefficient2: "К",
		x2: "x2",
		awardPercent: "% Премия",
		productCode2: "Код",
		productName2: "Наименование",
		products: "Изделия",
		loginPlaceholder: "Логин",
		passwordPlaceholder: "Пароль",
		fieldRequired: "Это поле обязательно для заполнения",
		passwordMinLength: "Пароль должен состоять минимум из 6 символов",
		brigade: "Бригада:",
		members: "Участники",
		formedOrders: "Сформированные наряды:",
		login: "Войти",
		clear: "Очистить",
		selectPlaceholder: "Выберите...",
		email: "Почта",
		phone: "Телефон",
		name: "Имя",
		secondName: "Фамилия",
		middleName: "Отчество",
		itineraries: "Маршуртные листы",
		tasklists: "Наряды заданий",
		profile: "Профиль",
		warning: "Предупреждение",
		success: "Успех",
		error: "Ошибка",
		networkError: "Проблемы с соединением",
		badRequestError: "Некорретные данные запроса",
		unauthorizedError: "Для доступа требуется авторизация",
		forbiddenError: "У Вас нету доступа к этому ресурсу",
		notFoundError: "Ресурс не найден :(",
		serverError: "Ошибка сервера",
		unknownError: "Неизвестная ошибка",
		invalidCredentials: "Пользователь с таким логином и паролем не найден",
		noOperations: "Операций нет",
		serverRequestError: "Что-то пошло не так в процессе запроса к серверу",
		unknownErrorOccurred: "Неизвестна ошибка",
		selectDate: "Выбрана дата:",
		department_placeholder: "Цех",
		download_report: "Скачать отчёт",
	},

	[LOCALES.ENGLISH]: {
		save: "Save",
		choose: "Choose",
		cancle: "Cancle",
		create: "Create",
		date: "Date",
		productCode: "Product Code",
		productName: "Product Name",
		number: "N",
		kit: "Kit",
		route: "Route",
		id: "ID",
		department: "Department",
		operationType: "Operation Type",
		category: "Category",
		normTime: "Norm Time",
		equipment: "Equipment",
		executor: "Executor",
		paymentCoefficient: "Coefficient",
		award: "Award %",
		dateIssue: "Issue Date",
		dateExecution: "Execution Date",
		operation: "Operation",
		product: "Product",
		paymentCoefficient2: "Coefficient",
		x2: "x2",
		awardPercent: "Award %",
		productCode2: "Code",
		productName2: "Name",
		products: "Products",
		loginPlaceholder: "Login",
		passwordPlaceholder: "Password",
		fieldRequired: "This field is required",
		passwordMinLength: "Password must be at least 6 characters",
		brigade: "Brigade:",
		members: "Members",
		formedOrders: "Formed Orders:",
		login: "Login",
		clear: "Clear",
		selectPlaceholder: "Select...",
		email: "Email",
		phone: "Phone",
		name: "Name",
		secondName: "Last Name",
		middleName: "Middle Name",
		itineraries: "Itineraries",
		tasklists: "Task Lists",
		profile: "Profile",
		warning: "Warning",
		success: "Success",
		error: "Error",
		networkError: "Network connection problems",
		badRequestError: "Incorrect request data",
		unauthorizedError: "Authorization required to access",
		forbiddenError: "You do not have access to this resource",
		notFoundError: "Resource not found :(",
		serverError: "Server error",
		unknownError: "Unknown error",
		invalidCredentials: "User with this login and password not found",
		noOperations: "No operations",
		serverRequestError: "Something went wrong during server request",
		unknownErrorOccurred: "Unknown error occurred",
		selectDate: "Date selected:",
		department_placeholder: "Department",
		download_report: "Download Report",
	},
}
