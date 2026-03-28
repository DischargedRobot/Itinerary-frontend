'use client'

import './NavBar.scss'

import Avatar from "@/shared/ui/Avatar/Avatar"
import { Menu, MenuProps } from "antd"
import Link from "next/link"
import { useNavBar } from '../model'

const MENU_ITEMS: MenuProps['items']= [
    {
        key: '/personal/itineraries',
        label: <Link href='/personal/itineraries'>{'Маршуртные листы'}</Link>
    },
    {
        key: '/personal/tasklists',
        label: <Link href='/personal/tasklists'>{'Наряды заданий'}</Link>
    },
    {
        key: '/personal/profile',
        label: <Link href='/personal/profile'><Avatar size={32}/></Link>,
        className: 'no-hover'        
    }
]

export const NavBar = () => {

    const { 
        selectedKeys
    } = useNavBar()

    return (
        <nav className="w-full border-b border-b-gray-300 shadow-sm" >
            <Menu
                selectedKeys={[selectedKeys ?? '']}
                className="nav-bar title title_very-litle w-full items-center justify-center"
                mode="horizontal"
                items={MENU_ITEMS}
            />
        </nav>
        
    )
}