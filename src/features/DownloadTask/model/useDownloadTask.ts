import { useState } from "react"
import { APIError, APIExcelRequesDownload } from "@/shared/api"
import { useAPIErrorHandler } from "@/shared/api"

interface ExcelGenerationRequest {
	executors: {
		id: number
		products: {
			id: number
			operations: {
				id: number
			}[]
		}[]
	}[]
}

export const useDownloadTask = () => {
	const [isLoading, setIsLoading] = useState(false)
	const handleError = useAPIErrorHandler()

	const handleDownload = async (
		executors: ExcelGenerationRequest["executors"],
	) => {
		setIsLoading(true)

		try {
			await APIExcelRequesDownload({ executors })
		} catch (error) {
			handleError(error as APIError)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		handleDownload,
		isLoading,
	}
}
