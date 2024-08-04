import React from 'react';
import { LEVELS_MAP } from '../../../../utils/valueLists';

const ClassroomCard = ({ classroom, buttonFunction }) => {
  const { level, title, students, daytime, duration_hours, _id } = classroom;

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <span className="text-white px-2 py-1 rounded mr-2" style={{backgroundColor: LEVELS_MAP[level]}}>{level}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="text-gray-700 mb-2">
        <strong>Fecha:</strong> {daytime ? new Date(daytime).toLocaleString() : null }
      </div>
      <div className='flex flex-row justify-between'>
        <div className="text-gray-700">
          <strong>Duración:</strong> {duration_hours} horas
        </div>
        <button className="bg-blue-500 text-white px-2 py-1 rounded-md w-1/6" onClick={() => buttonFunction(_id)}>Modificar Clase</button>
      </div>  
    </div>
  );
};

export default ClassroomCard;
