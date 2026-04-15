import { TRole } from "@/shared/model"

export interface IUser {
	id: number
	login: string
	password: string
	name: string
	secondName: string
	middleName?: string
	email: string
	phoneNumber?: string
	role: TRole
}
