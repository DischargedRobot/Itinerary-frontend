import { mapAPIError, APIError } from "."

export interface ExcelGenerationRequest {
	executors: {
		id: number
		products: {
			id: number
			itineraries: {
				id: number
				operations: {
					id: number
				}[]
			}[]
		}[]
	}[]
}

const URL = process.env.NEXT_PUBLIC_API_URL

export async function APIExcelRequesDownload(request: ExcelGenerationRequest) {
	try {
		const response = await fetch(`${URL}/Calculations/excel`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		})

		if (!response.ok) {
			throw mapAPIError(response.status)
		}

		return response.blob()
	} catch (error) {
		console.log(error)
		if (error instanceof TypeError && error.message === "Failed to fetch") {
			throw mapAPIError(null)
		}
		// не наш
		if (!(error instanceof APIError)) {
			throw mapAPIError(0)
		}
		if (error instanceof APIError && error.status === 401) {
			console.log("Unauthorized, redirecting to /auth")
			window.location.pathname = "/auth"
		}
		throw error as APIError
	}
}
