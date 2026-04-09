import { FormattedMessage } from "react-intl"
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

export const FormattedMessageWithValues = <T extends keyof AllMessage>({
	id,
	values,
}: FormattedMessageProps<T>) => (
	<FormattedMessage id={id} values={values || {}} />
)
