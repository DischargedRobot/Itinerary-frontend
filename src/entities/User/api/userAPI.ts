import { type IUser } from "../lib"
import { APIJSONRequest } from "@/shared/api"

type IUserAuthRequest = {
	login: string
	password: string
}

export interface IUserAuthResponse extends IUser {
	id: number
}

export const userAPI = {
	login: async (payload: IUserAuthRequest) => {
		return APIJSONRequest<IUserAuthResponse>("Auth/Login", {
			method: "POST",
			body: JSON.stringify(payload),
		})
	},

	register: async (user: IUser) => {
		return APIJSONRequest<IUserAuthResponse>("Auth/Register", {
			method: "POST",
			body: JSON.stringify(user),
		})
	},

	updateProfile: async (updates: Partial<IUser>) => {
		return APIJSONRequest<IUser>(`Users/${updates.id}`, {
			method: "PUT",
			body: JSON.stringify(updates),
		})
	},

	getProfile: async (id: number) => {
		return APIJSONRequest<IUser>(`Users/${id}`)
	},
}
