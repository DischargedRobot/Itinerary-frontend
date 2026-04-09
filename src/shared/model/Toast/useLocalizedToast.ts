import { useIntl } from "react-intl"
import { showToast, IToast, TToast } from "./useToastStore"

export const useLocalizedToast = () => {
	const intl = useIntl()

	const getLocalizedTitle = (type: TToast): string => {
		const titleMap: Record<TToast, string> = {
			warning: intl.formatMessage({ id: "warning" }),
			success: intl.formatMessage({ id: "success" }),
			error: intl.formatMessage({ id: "error" }),
		}
		return titleMap[type]
	}

	const showLocalizedToast = (props: IToast) => {
		showToast({
			...props,
			title: props.title || getLocalizedTitle(props.type),
		})
	}

	return {
		showLocalizedToast,
	}
}
