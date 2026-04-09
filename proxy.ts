import Negotiator from "negotiator"
import { match } from "@formatjs/intl-localematcher"
import { NextRequest, NextResponse } from "next/server"

const locales = ["en-US", "ru-RU"]
const defaultLocale = "ru-RU"

function getLocale(request: NextRequest): string {
	const negotiatorHeaders: Record<string, string> = {}
	request.headers.forEach((value, key) => {
		negotiatorHeaders[key] = value
	})

	// Получаем список языков браузера в порядке предпочтения
	const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

	// Выбираем лучшую локаль из доступных
	return match(languages, locales, defaultLocale)
}

export function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Проверяем, есть ли уже локаль в URL
	const pathnameHasLocale = locales.some((locale) =>
		pathname.startsWith(`/${locale}/`),
	)

	// Если локаль уже в URL, пропускаем, иначе - дальше
	if (pathnameHasLocale) return

	const locale = getLocale(request)

	return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
}

export const config = {
	matcher: [
		// Пропускаем API, статику и служебные пути
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
}
