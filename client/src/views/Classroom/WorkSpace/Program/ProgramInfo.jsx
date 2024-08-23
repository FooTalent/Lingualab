import React from 'react'

export default function ProgramInfo({ program }) {
    return (
        <div className="flex flex-nowrap justify-between">
            <p className="w-3/12 flex gap-4">
                <span className='font-semibold'>Idioma:</span>
                {program.language}
            </p>

            <p className="w-3/12 flex gap-4">
                <span className='font-semibold'>Nivel:</span>
                {program.level}
            </p>

            <p className="w-3/12 flex gap-4">
                <span className='font-semibold'>Descripción:</span>
                {program.description}
            </p>
        </div>
    )
}
