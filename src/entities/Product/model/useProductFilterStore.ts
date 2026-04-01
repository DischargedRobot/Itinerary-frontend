import { create } from "zustand"

interface IProductFilterStore {
	startDate: Date
	lastDate: Date
	name: string

	setDate: (newStartDate: Date, newLastDate: Date) => void
	setName: (newName: string) => void
}

export const useProductFilterStore = create<IProductFilterStore>((set) => ({
	startDate: new Date(),
	lastDate: new Date(),
	name: "",

	setDate: (startDate, lastDate) => set({ startDate, lastDate }),
	setName: (name) => set({ name }),
}))
