import Avatar from "@/shared/ui/Avatar/Avatar"
import { Menu, MenuProps } from "antd"
import Link from "next/link"

const MENU_ITEMS: MenuProps['items']= [
    {
        key: 'Itineraries',
        label: <Link href='/personal/Itineraries'>{'Маршуртные листы'}</Link>
    },
    {
        key: 'TaskLists',
        label: <Link href='/personal/TaskLists'>{'Сформировать наряды'}</Link>
    },
    {
        key: 'CreatedTaskLists',
        label: <Link href='/personal/CreatedTaskLists'>{'Сформированные наряды'}</Link>
    },
    {
        key: 'Profile',
        label: <Link href='/personal/Profile'><Avatar/></Link>
    }
]

export const NavBar = () => {

    return (
        <Menu
            mode="horizontal"
            items={MENU_ITEMS}
        />
    )
}