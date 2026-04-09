import { usePathname } from "next/navigation"
import { useParams } from "next/navigation"

export const useNavBar = () => {
	const pathname = usePathname()
	const params = useParams()
	const lang = params.lang as string

	// Определяем активный пункт меню на основе текущего пути
	const getSelectedKey = () => {
		if (pathname.includes("/personal/itineraries"))
			return `/${lang}/personal/itineraries`
		if (pathname.includes("/personal/tasklists"))
			return `/${lang}/personal/tasklists`
		if (pathname.includes("/personal/profile"))
			return `/${lang}/personal/profile`
		return ""
	}

	return { selectedKeys: getSelectedKey(), lang }
}
