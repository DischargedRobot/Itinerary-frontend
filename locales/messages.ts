import { LOCALES } from "./lolales"

export type MessagesWithoutVaribles = {
	save: string
	choose: string
	cancle: string
	create: string
}

export type MessageVariables = {
	itemAdded: { item: string }
	priceDisplay: { price: number }
	dateFormat: { date: Date }
}

export type MessagesWithVaribles = {
	[M in keyof MessageVariables]: string
}

export type AllMessage = MessagesWithoutVaribles & MessagesWithVaribles

type TMessages = {
	[K in (typeof LOCALES)[keyof typeof LOCALES]]: Partial<AllMessage>
}

export const messages: TMessages = {
	[LOCALES.RUSSIAN]: {
		save: "Сохранить",
		choose: "Выбрать",
		cancle: "Оменить",
		create: "Сформировать",
		itemAdded: "Добавлено: {item}",
	},

	[LOCALES.ENGLISH]: {
		save: "Save",
		choose: "Choose",
		cancle: "Cancle",
		create: "Create",
	},
}
