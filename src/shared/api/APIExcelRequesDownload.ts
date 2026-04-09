import { mapAPIError } from "."

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

export async function APIExcelRequesDownload(request: ExcelGenerationRequest) {
	try {
		const response = await fetch("/api/calculations/excel", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(request),
		})

		if (!response.ok) {
			throw mapAPIError(response.status)
		}

		// создаём файл
		const blob = await response.blob()

		const url = window.URL.createObjectURL(blob)

		const link = document.createElement("a")
		link.href = url

		const fileName = `Расчеты_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.xlsx`
		link.download = fileName

		// качаем
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)

		// освобождаем память
		window.URL.revokeObjectURL(url)
	} catch (error) {
		console.error("Ошибка при скачивании файла:", error)
		throw error
	}
}
