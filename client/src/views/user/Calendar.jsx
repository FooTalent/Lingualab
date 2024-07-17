import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Calendar() {
    const navItems = ['Aula Virtual', 'Calendario', 'Recursos']
    const location = useLocation().pathname

    return (
        <div className='bg-white'>
            <nav className='flex justify-center gap-14 border-b shadow-'>
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
                                className={`py-2 text-lg ${routeSimple === navItemLower ? 'text-Purple' : 'text-gray-500'}  hover:text-PurpleHover`}
                            >
                                {navItem}
                            </Link>
                        )
                    })
                }
            </nav>

            <main className='flex flex-wrap py-3 px-16'>
                <h1 className='text-4xl w-full mb-6'>Gestioná tus clases!</h1>

                <div className='border w-2/4 rounded-lg shadow-lg p-4'>
                    <div className='flex gap-5 mb-3'>
                        <span className='bg-yellow-400 px-4 py-2 text-sm rounded-md'>A1-A2</span>
                        <h2 className='font-bold text-lg'>Clase n° 1</h2>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col w-2/4'>
                            <span>Nombre del alumno</span>
                            <span>11/07/2024</span>
                            <span>18:00 - 19:00 hs</span>
                            <button>Recursos de esta clase</button>
                        </div>
                        <div>
                            <button>Empieza ahora</button>
                            <button>...</button>
                        </div>
                    </div>
                </div>

                <aside>
                    <div>
                        <input type="search" name="" id="" />
                        <button>Filtrar</button>
                    </div>
                </aside>
            </main>


        </div>
    )
}
