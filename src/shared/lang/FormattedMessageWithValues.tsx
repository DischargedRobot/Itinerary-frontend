import { FormattedMessage, IntlShape, useIntl } from "react-intl"
import {
	AllMessage,
	MessagesWithVaribles,
	MessageVariables,
} from "../../../locales/messages"

// Сообщения с параметрами
type MessagesWithParams = keyof MessagesWithVaribles

type FormattedMessageProps<T extends keyof AllMessage> =
	T extends MessagesWithParams
		? { id: T; values: MessageVariables[T] }
		: { id: T; values?: never }

// type RestrictedIntlShape<T extends keyof AllMessage> = Omit<
// 	IntlShape,
// 	"formatMessage"
// > & {
// 	formatMessage: (descriptor: { id: T; defaultMessage?: string }) => string
// }

// export const useCustomIntl = <
// 	T extends keyof AllMessage,
// >(): RestrictedIntlShape<T> => {
// 	const intl = useIntl()
// 	return intl as RestrictedIntlShape<T>
// }

export const FormattedMessageWithValues = <T extends keyof AllMessage>({
	id,
	values,
}: FormattedMessageProps<T>) => (
	<FormattedMessage id={id} values={values || {}} />
)
