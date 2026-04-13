"use client"

import "./NavBar.scss"

import { useIntl } from "react-intl"
import Avatar from "@/shared/ui/Avatar/Avatar"
import { Menu, MenuProps } from "antd"
import Link from "next/link"
import { useNavBar } from "../model"
import { UserLogOut } from "@/features/UserProfileAction"
import { LanguageSwitcher } from "@/features/LanguageSwitcher"

export const NavBar = () => {
	const { selectedKeys, lang } = useNavBar()
	const intl = useIntl()

	const MENU_ITEMS: MenuProps["items"] = [
		{
			key: `/${lang}/personal/itineraries`,
			label: (
				<Link href={`/${lang}/personal/itineraries`}>
					{intl.formatMessage({ id: "itineraries" })}
				</Link>
			),
		},
		{
			key: `/${lang}/personal/tasklists`,
			label: (
				<Link href={`/${lang}/personal/tasklists`}>
					{intl.formatMessage({ id: "tasklists" })}
				</Link>
			),
		},
		{
			key: `/${lang}/personal/profile`,
			label: (
				<Link href={`/${lang}/personal/profile`}>
					<Avatar size={32} />
				</Link>
			),
			className: "no-hover",
		},
		{
			key: "language",
			label: <LanguageSwitcher />,
			className: "no-hover",
		},
		{
			key: "logout",
			label: <UserLogOut />,
			className: "no-hover",
		},
	]

	return (
		<nav className="w-full border-b border-b-gray-300 shadow-sm">
			<Menu
				selectedKeys={[selectedKeys ?? ""]}
				className="nav-bar title title_very-litle w-full items-center justify-center"
				mode="horizontal"
				items={MENU_ITEMS}
			/>
		</nav>
	)
}
