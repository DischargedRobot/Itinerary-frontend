import { APIError, mapAPIError } from "./apiError"

const URL = process.env.NEXT_PUBLIC_API_URL

export const APIJSONRequest = async <T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T[]> => {
	try {
		const response = await fetch(`${URL}/${endpoint}`, {
			...options,
			headers: {
				"Content-Type": "application/json",
				...options?.headers,
			},
			credentials: "include",
		})

		if (!response.ok) {
			throw mapAPIError(response.status)
		}

		return response.json()
	} catch (error) {
		console.log(error)

		if (error instanceof TypeError && error.message === "Failed to fetch") {
			throw mapAPIError(null)
		}
		// не наша
		if (!(error instanceof APIError)) {
			throw mapAPIError(0)
		}

		throw error as APIError
	}
}
