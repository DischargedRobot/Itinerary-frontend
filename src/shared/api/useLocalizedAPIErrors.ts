import { useIntl } from "react-intl"
import { APIError } from "./apiError"

export const useLocalizedAPIErrors = () => {
	const intl = useIntl()

	const getLocalizedError = (status: number | null): string => {
		switch (status) {
			case null:
				return intl.formatMessage({ id: "networkError" })
			case 400:
				return intl.formatMessage({ id: "badRequestError" })
			case 401:
				return intl.formatMessage({ id: "unauthorizedError" })
			case 403:
				return intl.formatMessage({ id: "forbiddenError" })
			case 404:
				return intl.formatMessage({ id: "notFoundError" })
			case 500:
				return intl.formatMessage({ id: "serverError" })
			default:
				return intl.formatMessage({ id: "unknownError" })
		}
	}

	const createLocalizedAPIError = (
		status: number | null,
		errorType: string,
	): APIError => {
		const message = getLocalizedError(status)
		return new APIError(status, errorType, message)
	}

	return {
		getLocalizedError,
		createLocalizedAPIError,
	}
}
