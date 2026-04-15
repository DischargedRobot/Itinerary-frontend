import { type IUser } from "../lib"
import { APIJSONRequest } from "@/shared/api"

const USERS_URL = "Users"

type IUserAuthRequest = {
	login: string
	password: string
}

export interface IUserAuthResponse extends IUser {
	roleId: number
	roleName?: string
}

const mapRole = (user: IUser & { roleId: number; roleName?: string }) => {
	if (!user) return user
	const roleId = (user.roleId ?? user.role) as number | string | undefined
	let role = user.role
	if (roleId === 1 || roleId === "1") role = "Executor"
	if (roleId === 2 || roleId === "2") role = "Foreman"

	const { roleName, roleId: _, ...rest } = user
	return { ...rest, role }
}

export const userAPI = {
	login: async (payload: IUserAuthRequest) => {
		const res = await APIJSONRequest<IUserAuthResponse>(
			`${USERS_URL}/auth`,
			{
				method: "POST",
				body: JSON.stringify(payload),
			},
		)

		return mapRole(res) as IUserAuthResponse
	},

	register: async (user: IUser) => {
		const res = await APIJSONRequest<IUserAuthResponse>(
			`${USERS_URL}/register`,
			{
				method: "POST",
				body: JSON.stringify(user),
			},
		)

		return mapRole(res) as IUserAuthResponse
	},

	updateProfile: async (updates: Partial<IUser>) => {
		return APIJSONRequest<IUser>(`${USERS_URL}/${updates.id}`, {
			method: "PUT",
			body: JSON.stringify(updates),
		})
	},

	getProfile: async (id: number) => {
		const res = await APIJSONRequest<IUserAuthResponse>(
			`${USERS_URL}/${id}`,
		)
		return mapRole(res) as IUser
	},

	getMe: async (cookieHeader?: string) => {
		const res = await APIJSONRequest<IUserAuthResponse>(`${USERS_URL}/me`, {
			headers: cookieHeader ? { Cookie: cookieHeader } : undefined,
		})

		return mapRole(res) as IUser
	},

	logout: async () => {
		return APIJSONRequest<void>(`${USERS_URL}/logout`, {
			method: "POST",
		})
	},
}
