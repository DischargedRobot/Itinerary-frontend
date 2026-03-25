import { create } from "zustand";

interface IProductFilterStore {
    startDate: Date
    lastDate: Date

    setDate: (newStartDate: Date, newLastDate: Date) => void
}

export const useProductFilterStore = create<IProductFilterStore>(set => ({

    startDate: new Date,
    lastDate: new Date,

    setDate: (newStartDate, newLastDate) => set({startDate: newStartDate, lastDate: newLastDate})

}))