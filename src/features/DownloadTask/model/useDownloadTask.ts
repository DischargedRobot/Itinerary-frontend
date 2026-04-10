import { useState } from "react"
import { APIExcelRequesDownload } from "@/shared/api"
import { ExcelGenerationRequest } from "@/shared/api/APIExcelRequesDownload"
import { showToast } from "@/shared"

export const useDownloadTask = (): {
	handleDownload: (
		executors: ExcelGenerationRequest["executors"],
	) => Promise<void>
	isLoading: boolean
} => {
	const [isLoading, setIsLoading] = useState(false)

	const handleDownload = async (
		executors: ExcelGenerationRequest["executors"],
	) => {
		setIsLoading(true)

		try {
			const blob = await APIExcelRequesDownload({ executors })

			// создаём URL для blob
			const url = window.URL.createObjectURL(blob)
			const fileName = `Расчеты_${new Date().toISOString().slice(0, 19).replace(/:/g, "-")}.xlsx`

			// создаём ссылку и автоматически кликаем
			const link = document.createElement("a")
			link.href = url
			link.download = fileName
			link.rel = "noopener noreferrer"
			link.style.display = "none"

			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)

			// освобождаем память
			window.URL.revokeObjectURL(url)
		} catch (error) {
			console.error("Ошибка при скачивании файла:", error)
			showToast({
				type: "error",
				text:
					error instanceof Error
						? error.message
						: "Ошибка при скачивании файла",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return {
		handleDownload,
		isLoading,
	}
}
