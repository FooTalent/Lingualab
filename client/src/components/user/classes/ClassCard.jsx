import React, { useState } from 'react'
import ClassCardResources from './ClassCardResources'

export default function ClassCard({ level, students, resources }) {
    const [open, setOpen] = useState(false)

    const handleResources = (open) => {
        const newState = open
        newState ? setOpen(false) : setOpen(true)
    }
    return (
        <div className='border rounded-xl shadow-lg p-4 flex justify-between flex-wrap w-full'>
            <div className='flex flex-col gap-4 w-4/6'>
                <div className='flex gap-6 items-center'>
                    <div className='bg-Purple rounded-md px-3 py-2 font-bold text-white text-sm'>{level}</div>
                    <h2 className='font-bold self-center'>Clase N° 1</h2>
                </div>

                <div className='flex flex-col gap-2 text-sm'>
                    <p className='text-ellipsis'>{students}</p>
                    <p>11/07/2024</p>
                    <p>18:00 - 19:00 hs</p>
                </div>

                <ClassCardResources handleResources={handleResources} state={open} />
            </div>

            <div className='flex flex-col justify-between items-end'>
                <button>...</button>
                <button className='flex gap-3 rounded-lg px-3 py-2 bg-yellow-300'>Empieza ahora</button>
            </div>

            <ul className={`w-full overflow-hidden transition-all duration-150 ease-linear ${open ? 'max-h-[500px] mt-3 p-2 border-t' : 'max-h-0 border-none'}`}>
                {
                    resources
                        ?
                        resources.map(resource => {
                            return (
                                <li>{resource}</li>
                            )
                        })
                        : <li>Sin recursos asignados</li>
                }
            </ul>
        </div>
    )
}
