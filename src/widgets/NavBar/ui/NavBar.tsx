import { Menu, MenuProps } from "antd"
import Link from "next/link"

const MENU_ITEMS: MenuProps['items']= [
    {
        key: 'Itineraries',
        label: <Link href='/personal/Itineraries'>{'Маршуртные листы'}</Link>
    },
    {
        key: 'TaskOutfits',
        label: <Link href='/personal/TaskOutfits'>{'Сформировать наряды'}</Link>
    },
    {
        key: 'CreatedTaskOutfits',
        label: <Link href='/personal/CreatedTaskOutfits'>{'Сформированные наряды'}</Link>
    }
]

export const NavBar = () => {

    return (
        <>
        <Menu
            mode="horizontal"
            items={MENU_ITEMS}
        />
        </>
    )
}