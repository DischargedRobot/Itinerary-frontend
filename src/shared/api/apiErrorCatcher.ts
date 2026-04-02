import { showToast } from "../model"
import { APIError, isAPIError } from "./apiError"

export const apiErrorCatcher = (error: Error | APIError) => {
	if (isAPIError(error)) {
		if (error.status !== 404) {
			showToast({
				type: "warning",
				message: error.message,
				duration: 2000,
			})
		}
	} else {
		showToast({
			type: "error",
			message: "Упс, возникла серьёзная ошибка",
			duration: 2000,
		})
		console.log(error)
	}
}
