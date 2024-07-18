import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function NavUser() {
    const navItems = ['Aula Virtual', 'Calendario', 'Recursos']
    const location = useLocation().pathname

    return (
        <nav className='h-16 flex justify-center items-center gap-8 border-b shadow'>
            {
                navItems.map(navItem => {
                    const route = location.split('/')
                    const routeSplit = route[route.length - 1].toLowerCase(0)
                    const navItemLower = navItem.toLowerCase().replace(' ', '-')
                    const routeSimple = routeSplit.replace('%20', '-')

                    return (

                        <Link
                            key={navItem}
                            to={`/user/${navItem}`}
                            className={`text-2xl ${routeSimple === navItemLower ? 'text-Purple font-extrabold' : 'text-gray-500'}  hover:text-PurpleHover`}
                        >
                            {navItem}
                        </Link>
                    )
                })
            }
        </nav>
    )
}
