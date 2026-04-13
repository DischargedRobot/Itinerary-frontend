import { APIError, mapAPIError } from "./apiError"

const URL = process.env.NEXT_PUBLIC_API_URL

export const APIJSONRequest = async <T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T> => {
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

		if (response.status === 204) {
			return {} as T
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
		if (error instanceof APIError && error.status === 401) {
			console.log("Unauthorized, redirecting to /auth")
			if (typeof window !== "undefined") {
				window.location.pathname = "/auth"
			}
		}
		throw error as APIError
	}
}
