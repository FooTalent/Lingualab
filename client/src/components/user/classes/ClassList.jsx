import React from 'react'
import ClassCard from './ClassCard'

export default function ClassList({ dayClases }) {
    return (
        <div className='w-6/12 flex flex-col gap-7'>
            {
                dayClases.map(clase => {
                    return (
                        <ClassCard
                            key={Math.random()}
                            title={clase.title}
                            level={clase.level}
                            students={clase.students}
                            date={clase.date}
                            resources={clase.class}
                        />
                    )
                })
            }
        </div>
    )
}
