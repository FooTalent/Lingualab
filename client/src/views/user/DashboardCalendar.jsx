import React from 'react'
import NavUser from '../../components/user/NavUser'
import ClassList from '../../components/user/ClassList'

export default function DashboardCalendar() {
    const getClases = ['', '', '']

    return (
        <div className='bg-white'>
            <NavUser />

            <main className='flex flex-wrap justify-between py-5 pt-20 px-16'>
                <div className='w-2/4 flex flex-col gap-7'>
                    <ClassList nextClasses={getClases} />
                </div>

                <aside className='flex flex-col w-96 item-center'>
                    <div className='flex flex-nowrap justify-between gap-2'>
                        <input type="search" className='border rounded-lg px-3 py-4 outline-none bg-slate-100 text-gray-400' placeholder='Buscar clases anteriores' />
                        <button className='flex gap-2 border rounded-lg px-4 py-3 items-center bg-yellow-300'>Filtrar</button>
                    </div>

                    <div>

                    </div>
                </aside>
            </main>


        </div>
    )
}
