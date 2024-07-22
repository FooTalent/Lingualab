import React from 'react'
import ClassCard from './ClassCard'

export default function ClassList({ nextClasses }) {
    return (
        <div className='w-6/12 flex flex-col gap-7'>
            {
                nextClasses.map(clase => {
                    return (
                        <ClassCard
                            key={Math.random()}
                        />
                    )
                })
            }
        </div>
    )
}
