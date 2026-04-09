import "./main.scss"

import type { Metadata } from "next"
import { ConfigProvider, ConfigProviderProps } from "antd"
import ruRU from "antd/locale/ru_RU"

export const metadata: Metadata = {
	title: "Маршрутные листы",
	description: "Всё, что нужно для маршуртных листов",
}

const COLORS = {
	background: "var(--background)",
	foreground: "var(--foreground)",
	hover: "var(--hover)",
	active: "var(--active)",
	activeElement: "var(--active-element)",
	placeholder: "var(--placeholder-color)",
	// --text-color: var(--color-gray-500),
	// --hover: theme('colors.blue.400'),
	// --active: theme('colors.blue.600'),
	// --activeElement: theme('colors.blue.200'),
}

const token: ConfigProviderProps["theme"] = {
	token: {
		colorBgLayout: COLORS.background,
		colorPrimary: COLORS.activeElement,
		colorPrimaryActive: COLORS.active,
		colorPrimaryHover: COLORS.hover,
		controlItemBgActive: COLORS.hover,
	},

	components: {
		Select: {
			optionSelectedColor: COLORS.foreground,
		},

		Layout: {
			headerBg: COLORS.foreground,
		},

		Menu: {
			colorBgBase: COLORS.foreground,
			itemBg: COLORS.foreground,
			colorSplit: COLORS.foreground,
			itemHoverColor: COLORS.hover,
			itemSelectedColor: COLORS.active,
			motionDurationSlow: "0.1s",
			// horizontalItemHoverColor: 'red',
			// horizontalItemHoverBg: 'black',
			itemColor: COLORS.placeholder,
			horizontalItemSelectedColor: COLORS.active,
			horizontalItemHoverColor: COLORS.hover,
		},

		Table: {
			// colorBgBase: COLORS.hover,
			// headerBg: COLORS.hover,
		},
		Calendar: {
			colorPrimary: COLORS.active,
			controlItemBgHover: COLORS.hover,
		},
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	console.log("RootLayout")
	return (
		<html className={`h-full antialiased`}>
			<ConfigProvider theme={token} locale={ruRU}>
				<body
					style={
						{
							"--ant-select-option-selected-bg": COLORS.hover,
						} as React.CSSProperties
					}
					className="min-h-full flex flex-col items-center"
				>
					{children}
				</body>
			</ConfigProvider>
		</html>
	)
}
