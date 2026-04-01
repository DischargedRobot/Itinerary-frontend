export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
	Partial<{
		[P in K]: T[P]
	}>
