import { IUser } from "../lib"
import { create } from "zustand"

interface IUserStore {
    currentUser: IUser

    setCurrentUser: (user: IUser | null) => void
    clearUser: () => void
    updateUser: (user: Partial<IUser>) => void
}

export const useUserStore = create<IUserStore>((set) => ({
    currentUser: null,

    setCurrentUser: (user) => set({ currentUser: user }),

    clearUser: () => set({ currentUser: null }),

    updateUser: (updatedData) =>
        set((state) => ({
            currentUser: state.currentUser
                ? {
                    ...state.currentUser,
                    ...updatedData,
                }
                : null,
        })),
}))
