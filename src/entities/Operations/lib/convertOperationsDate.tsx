import { IOperationResponse, IOperationResponseWithDatesSting } from "../api/operationAPITypes"

const parseMaybeDotDate = (value?: string) => {
	if (!value) return undefined
	const dotMatch = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
	if (dotMatch) {
		const day = Number(dotMatch[1])
		const month = Number(dotMatch[2]) - 1
		const year = Number(dotMatch[3])
		return new Date(year, month, day)
	}

	const parsed = new Date(value)
	return isNaN(parsed.getTime()) ? undefined : parsed
}

export const convertOperationsDate = ({
	dateIssue,
	dateExecution,
	...operation
}: IOperationResponseWithDatesSting): IOperationResponse => ({
	...operation,
	dateIssue: parseMaybeDotDate(dateIssue),
	dateExecution: parseMaybeDotDate(dateExecution),
})
