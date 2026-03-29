import { MakeOptional } from "@/shared/lib"
import { create } from "zustand"

export type TToast = 'error' | 'warning' | `success`


interface IToast {
    duration: number
    title: string
    type: TToast
    message: string
    key: number
}


interface IToastStore  extends IToast{
    setToast: (newToast:  Omit<MakeOptional<IToast, 'title'>, 'key'>) => void
}

const defaultTitle = new Map<TToast, string>([
    ['warning', 'Предупреждение'],
    ['success', 'Успех'],
    ['error', 'Ошибка'],
])



export const useToastStore = create<IToastStore>(set => ({
    type: "warning",
    message: 'Тут текст тоста',
    title: defaultTitle.get("warning") ?? '',
    duration: 3000,
    key: 0,

    setToast: (newToast) => set(state => ({...newToast, title: newToast.title ?? defaultTitle.get(newToast.type), key: ++state.key, isVisible: true})),
}))


export const showToast = (toast: Omit<MakeOptional<IToast, 'title'>, 'key'>) => {
    useToastStore.getState().setToast(toast)
}