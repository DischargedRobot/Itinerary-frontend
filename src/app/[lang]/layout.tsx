import { ReactNode } from "react"
import { IntlProvider } from "react-intl"
import { LOCALES } from "../../../locales/lolales"
import { messages } from "../../../locales/messages"

export async function generateStaticParams() {
	return Object.values(LOCALES).map((locale) => ({
		lang: locale,
	}))
}

interface Props {
	children: ReactNode
	params: Promise<{ lang: (typeof LOCALES)[keyof typeof LOCALES] }>
}

export default async function LangLayout({ params, children }: Props) {
	const { lang } = await params

	return (
		<IntlProvider
			locale={lang}
			defaultLocale={LOCALES.RUSSIAN}
			messages={messages[lang]}
		>
			{children}
		</IntlProvider>
	)
}
