import React from 'react'
import ClassCard from './ClassCard'

export default function ClassList({ dayClases }) {
    return (
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
    )
}
