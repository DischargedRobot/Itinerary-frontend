import { APIError, mapAPIError } from "./apiError"

const URL = process.env.NEXT_PUBLIC_API_URL 

export const APIJSONRequest = async <T>(
    endpoint: string,
    options?: RequestInit
): Promise<T[]> => {

    try { 
        const response = await fetch(`${URL}/${endpoint}`, {
            ...options,
            headers: {
                'Conten-Type': 'aplication/json',
                ...options?.headers,
            }
        })

        if (!response.ok) {
            throw mapAPIError(response.status)
        }

        return response.json()

    } catch (error) {
        if (error instanceof TypeError && error.message === 'Failed to fetch') {
            throw mapAPIError(null)
        }

        // не наша
        if (!(error instanceof APIError)) {
            throw mapAPIError(0)
        }

        throw error as APIError
    }
}