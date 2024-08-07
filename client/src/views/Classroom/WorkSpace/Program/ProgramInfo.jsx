import React from 'react'

export default function ProgramInfo({ program }) {
    return (
        <div className="flex flex-nowrap justify-between">
            <p className="w-3/12 flex gap-4">
                <span className='font-semibold'>Idioma:</span>
                {program.language}
            </p>
            <p className="w-3/12 flex gap-4">
                <span className='font-semibold'>Profesor:</span>
                {program.teacher.last_name}, {program.teacher.first_name}
            </p>
            <p className="w-3/12 flex gap-4 truncate">
                <span className='font-semibold'>Alumno:</span>
                { }
            </p>
        </div>
    )
}
