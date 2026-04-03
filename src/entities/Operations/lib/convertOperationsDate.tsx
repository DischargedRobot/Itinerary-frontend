import { IOperationResponse, IOperationResponseWithDatesSting } from "../api/operationAPITypes"

export const convertOperationsDate = ({
	dateIssue,
	dateExecution,
	...operation
}: IOperationResponseWithDatesSting): IOperationResponse => ({
	...operation,
	dateIssue: dateIssue ? new Date(dateIssue) : undefined,
	dateExecution: dateExecution ? new Date(dateExecution) : undefined,
})
