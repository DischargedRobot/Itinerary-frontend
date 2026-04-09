import { create } from "zustand"

export type TToast = "error" | "warning" | "success"

export interface IToast {
	type: TToast
	text: string
	title?: string
	duration?: number
}

export interface IToastItem extends IToast {
	id: number
}

interface IToastStore {
	toasts: IToastItem[]
	activeToast: {
		id: number
		position: { top: number; left: number }
		activatedAt: number
	} | null
	addToast: (toast: IToast) => void
	removeToast: (id: number) => void
	setActiveToast: (
		toast: { id: number; position: { top: number; left: number } } | null,
	) => void
}

const defaultTitle = new Map<TToast, string>([
	["warning", "Предупреждение"],
	["success", "Успех"],
	["error", "Ошибка"],
])

export const useToastStore = create<IToastStore>((set) => {
	let toastId = 0
	return {
		toasts: [],
		activeToast: null,
		addToast: (newToast) =>
			set((state) => ({
				toasts: [
					...state.toasts,
					{
						...newToast,
						title:
							newToast.title ?? defaultTitle.get(newToast.type),
						duration: newToast.duration ?? 3000,
						id: ++toastId,
					},
				],
			})),
		removeToast: (id) =>
			set((state) => ({
				toasts: state.toasts.filter((toast) => toast.id !== id),
			})),
		setActiveToast: (activeToast) =>
			set({
				activeToast: activeToast
					? { ...activeToast, activatedAt: Date.now() }
					: null,
			}),
	}
})

export const showToast = (props: IToast) => {
	useToastStore.getState().addToast(props)
}
