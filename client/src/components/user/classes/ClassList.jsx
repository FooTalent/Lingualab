import React from 'react';
import ClassCard from './ClassCard';

export default function ClassList({ dayClases, toggleOptions, stateOption }) {
    return (
        dayClases.map(clase => (
            <ClassCard
                key={clase._id}
                id={clase._id}
                title={clase.title}
                level={clase.level}
                students={clase.students}
                date={clase.date}
                resources={clase.class}
                duration={clase.duration_card}
                isNow={clase.isNow}
                linkMeet={clase.link_meet}
                toggleOptions={toggleOptions}
                stateOption={stateOption}
            />
        ))
    );
}
