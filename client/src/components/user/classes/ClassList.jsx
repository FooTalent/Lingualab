import React from 'react';
import ClassCard from './ClassCard';

export default function ClassList({ data, toggleOptions, stateOption }) {
    return (
        data.map(clase => (
            <ClassCard
                key={clase._id}
                id={clase._id}
                title={clase.title}
                level={clase.level}
                students={clase.program.students}
                duration={clase.duration_card}
                date={clase.daytime}
                program={clase.program}
                toggleOptions={toggleOptions}
                stateOption={stateOption}
            />
        ))
    );
}
