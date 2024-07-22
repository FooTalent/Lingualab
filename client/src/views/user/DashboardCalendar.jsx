import React from 'react'
import ClassList from '../../components/user/classes/ClassList'
import UserCalendar from '../../components/user/calendar/UserCalendar'

export default function DashboardCalendar() {
    const getClases = ['', '', '']

    return (
        <main className='flex flex-wrap justify-between px-16'>
            <ClassList nextClasses={getClases} />

            <aside className='flex flex-col w-4/12 item-center'>
                <div className='flex flex-nowrap justify-between gap-2'>
                    <input type="search" className='w-8/12 border focus:border-yellow-200 rounded-lg px-3 py-3 outline-none bg-slate-100 placeholder:text-gray-400 placeholder:focus:text-neutral-700 text-neutral-700' placeholder='Buscar clases anteriores' />
                    <button className='w-4/12 flex gap-2 border rounded-lg px-4 py-3 items-center bg-yellow-300'>Filtrar</button>
                </div>

                <UserCalendar />
            </aside>
        </main>
    )
}
