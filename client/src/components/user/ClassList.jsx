import React from 'react'
import ClassCard from './ClassCard'

export default function ClassList({ nextClasses }) {
    return (
        nextClasses.map(clase => {
            return (
                <ClassCard 
                    key={Math.random()}
                />
            )
        })
    )
}
