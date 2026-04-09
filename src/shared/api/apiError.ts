import { IntlShape } from "react-intl"

interface IResponseError {
	status: number | null
	errorType: string
	customMessage?: string
}

export class APIError extends Error implements IResponseError {
	constructor(
		public status: number | null,
		public errorType: string,
		public message: string,
		public customMessage?: string,
	) {
		super(message || `Error ${errorType}`)
		this.name = `APIError`
	}
}

export function isAPIError(error: unknown): error is APIError {
	return (
		error instanceof APIError ||
		(typeof error === "object" &&
			error !== null &&
			//
			"status" in error &&
			typeof error.status === "number" &&
			error.status >= 300 &&
			error.status < 600 &&
			//
			"message" in error &&
			typeof error.message === "string")
	)
}

const fallbackMessages: Record<string, string> = {
	networkError: "Проблемы с соединением",
	badRequestError: "Некорретные данные запроса",
	unauthorizedError: "Для доступа требуется авторизация",
	forbiddenError: "У Вас нету доступа к этому ресурсу",
	notFoundError: "Ресурс не найден :(",
	serverError: "Ошибка сервера",
	unknownError: "Неизвестная ошибка",
}

const getLocalizedMessage = (messageId: string, intl?: IntlShape): string => {
	if (intl) {
		return intl.formatMessage({ id: messageId })
	}
	return fallbackMessages[messageId] || "Неизвестная ошибка"
}

const createAPIErrors = (intl?: IntlShape) => ({
	NETWORK: new APIError(
		null,
		"NETWORK",
		getLocalizedMessage("networkError", intl),
	),
	BAD_REQUEST: new APIError(
		400,
		"BAD_REQUEST",
		getLocalizedMessage("badRequestError", intl),
	),
	UNAUTHORIZED: new APIError(
		401,
		"UNAUTHORIZED",
		getLocalizedMessage("unauthorizedError", intl),
	),
	FORBIDEN: new APIError(
		403,
		"FORBIDDEN",
		getLocalizedMessage("forbiddenError", intl),
	),
	NOT_FOUND: new APIError(
		404,
		"NOT_FOUND",
		getLocalizedMessage("notFoundError", intl),
	),
	SERVER: new APIError(
		500,
		"SERVER_ERROR",
		getLocalizedMessage("serverError", intl),
	),
})

export const mapAPIError = (
	status: IResponseError["status"],
	intl?: IntlShape,
) => {
	const APIErrors = createAPIErrors()

	switch (status) {
		case null:
			return APIErrors.NETWORK
		case 400:
			return APIErrors.BAD_REQUEST
		case 401:
			return APIErrors.UNAUTHORIZED
		case 403:
			return APIErrors.FORBIDEN
		case 404:
			return APIErrors.NOT_FOUND
		case 500:
			return APIErrors.SERVER
		default:
			return new APIError(
				status,
				"UNKNOWN",
				getLocalizedMessage("unknownError", intl),
			)
	}
}
