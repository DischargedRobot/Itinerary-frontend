import { type IUser } from "../lib"
import { APIJSONRequest } from "@/shared/api"

const USERS_URL = "Users"

type IUserAuthRequest = {
	login: string
	password: string
}

export interface IUserAuthResponse extends IUser {
	id: number
}

export const userAPI = {
	login: async (payload: IUserAuthRequest) => {
		return APIJSONRequest<IUserAuthResponse>(`${USERS_URL}/auth`, {
			method: "POST",
			body: JSON.stringify(payload),
		})
	},

	register: async (user: IUser) => {
		return APIJSONRequest<IUserAuthResponse>(`${USERS_URL}/auth/register`, {
			method: "POST",
			body: JSON.stringify(user),
		})
	},

	updateProfile: async (updates: Partial<IUser>) => {
		return APIJSONRequest<IUser>(`${USERS_URL}/${updates.id}`, {
			method: "PUT",
			body: JSON.stringify(updates),
		})
	},

	getProfile: async (id: number) => {
		return APIJSONRequest<IUser>(`${USERS_URL}/${id}`)
	},
}
