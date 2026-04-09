import { IUser } from "../lib"
import { create } from "zustand"

interface IUserStore {
	currentUser: IUser | undefined

	setCurrentUser: (user: IUser) => void
	// clearUser: () => void
	updateUser: (user: Partial<IUser>) => void
}

export const useUserStore = create<IUserStore>((set) => ({
	currentUser: undefined,

	setCurrentUser: (user) => set({ currentUser: user }),

	// clearUser: () => set({ currentUser: null }),

	updateUser: (updatedData) =>
		set((state) => ({
			currentUser: state.currentUser
				? {
						...state.currentUser,
						...updatedData,
					}
				: undefined,
		})),
}))
