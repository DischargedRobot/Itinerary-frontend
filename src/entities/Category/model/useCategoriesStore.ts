import { ICatergory } from "@/shared/lib"
import { create } from "zustand"

interface ICaregoriesStore {
	categories: ICatergory[]

	setCategories: (newCategories: ICatergory[]) => void
}

export const useCategoriesStore = create<ICaregoriesStore>((set) => ({
	categories: [],

	setCategories: (categories) => set({ categories }),
}))
