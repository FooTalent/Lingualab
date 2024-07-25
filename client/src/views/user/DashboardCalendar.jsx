import React, { useEffect } from 'react'
import ClassList from '../../components/user/classes/ClassList'
import UserCalendar from '../../components/user/calendar/UserCalendar'
import { useAppStore } from "../../store/useAppStore";
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

export default function DashboardCalendar() {
    // const { fetchClasses, classes } = useAppStore()
    const user = JSON.parse(localStorage.getItem('user'))
    const classes = ['', '', '', '']

    useEffect(() => {
        // fetchClasses(user.token)
        console.log(classes)
    }, [])


    return (
        <main className='flex flex-wrap justify-between px-16'>
            <div className='w-6/12 flex flex-col gap-7'>
                {
                    classes.length === 0
                        ? <h1 className='text-2xl m-auto text-card'>NO HAY CLASES PARA EL DÍA SELECCIONADO</h1>
                        : <ClassList dayClases={classes} />
                }
            </div>


            <aside className='flex flex-col w-4/12 item-center'>
                <div className='flex flex-nowrap justify-between gap-2'>
                    <div className='flex flex-nowrap gap-2 text-base items-center border bg-slate-100 focus-within:border-yellowInput rounded-lg px-4 py-3'>
                        <SearchIcon />
                        <input
                            type="search"
                            className='bg-transparent p-0 outline-none border-0 placeholder:text-gray-400 placeholder:focus:text-neutral-700 text-neutral-700'
                            placeholder='Buscar clases anteriores'
                        />
                    </div>
                    <button className='text-card flex gap-1 border rounded-lg px-3 py-3 items-center bg-yellow-300'><FilterAltIcon /> Filtrar</button>
                </div>

                <UserCalendar />
            </aside>
        </main>
    )
}
