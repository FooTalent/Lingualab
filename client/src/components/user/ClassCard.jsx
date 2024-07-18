import React, { useState } from 'react'
import ClassCardResources from './ClassCardResources'

export default function ClassCard({ clase }) {
    const [open, setOpen] = useState(false)

    const handleResources = (open) => {
        const newState = open
        newState ? setOpen(false) : setOpen(true)
    }
    return (
        <div className='border rounded-xl shadow-lg p-4 flex justify-between flex-wrap'>
            <div className='flex flex-col gap-4 flex-wrap'>
                <div className='flex gap-6 items-center'>
                    <div className='bg-Purple rounded-md px-4 py-3 font-extrabold text-white text-sm'>A1-A2</div>
                    <h2 className='font-bold self-center'>Clase n° 1</h2>
                </div>

                <div className='flex flex-col gap-2 text-sm'>
                    <p>Nombre del alumno</p>
                    <p>11/07/2024</p>
                    <p>18:00 - 19:00 hs</p>
                </div>

                <ClassCardResources handleResources={handleResources} state={open} />
            </div>


            <div className='flex flex-col justify-between items-end'>
                <button>...</button>
                <button className='flex gap-3 rounded-lg px-3 py-2 bg-yellow-300'>Empieza ahora</button>
            </div>

            <ul className={`${open ? '' : 'hidden'} w-full border-t mt-3 p-2 ease-in-out transition-all duration-200`}>
                <li>Prueba</li>
                <li>Prueba</li>
                <li>Prueba</li>
                <li>Prueba</li>
                <li>Prueba</li>
            </ul>
        </div>
    )
}
