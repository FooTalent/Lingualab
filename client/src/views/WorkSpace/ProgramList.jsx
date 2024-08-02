import React from 'react'
import ProgramCard from './ProgramCard'

export default function ProgramList({ data, buttonFunction }) {
    return (
        <div className="grid grid-cols-2 gap-8">
            {
                data.map((program) => (
                    <ProgramCard
                        key={program._id}
                        program={program}
                        buttonFunction={buttonFunction}
                    />
                ))
            }
        </div>
    )
}
