import LayoutProps from "next"
import { IntlProvider } from "react-intl"
import { LOCALES } from "../../../locales/lolales"
import { messages } from "../../../locales/messages"

type Locale = "en-US" | "ru-RU"

// export async function generateStaticParams() {
// 	return Object.values(LOCALES).map((locale: Locale) => ({
// 		lang: locale,
// 	}))
// }

export default async function LangLayout({
	params,
	children,
}: LayoutProps<"/[lang]">) {
	const { lang } = (await params) as { lang: Locale }

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
