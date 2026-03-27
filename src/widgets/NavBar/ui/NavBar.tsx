import './NavBar.scss'

import Avatar from "@/shared/ui/Avatar/Avatar"
import { Menu, MenuProps } from "antd"
import Link from "next/link"

const MENU_ITEMS: MenuProps['items']= [
    {
        key: 'Itineraries',
        label: <Link href='/personal/itineraries'>{'Маршуртные листы'}</Link>
    },
    {
        key: 'TaskLists',
        label: <Link href='/personal/tasklists'>{'Сформировать наряды'}</Link>
    },
    {
        key: 'CreatedTaskLists',
        label: <Link href='/personal/createdtasklists'>{'Сформированные наряды'}</Link>
    },
    {
        key: 'Profile',
        label: <Link href='/personal/profile'><Avatar size={32}/></Link>,
        className: 'no-hover'        
    }
]

export const NavBar = () => {

    return (
        <nav className="w-full border-b border-b-gray-300 shadow-sm" >
            <Menu
                className="nav-bar title title_very-litle w-full items-center justify-center"
                mode="horizontal"
                items={MENU_ITEMS}
            />
        </nav>
        
    )
}