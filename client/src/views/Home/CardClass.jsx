import React from 'react';
import gettingHourClass from '../../utils/gettingHoursClass';

const CardClass = ({ thisclass }) => {
  return (
    <div className="shadow-home rounded-lg max-w-[357px] h-[165px] p-4 cursor-pointer ">
      <div className="flex flex-col justify-between h-full">
        <h2
          className="p-0 text-lg font-bold truncate"
          style={{ maxWidth: 'calc(100% - 8rem)' }}
        >
          {thisclass.title}
        </h2>
        <p className='flex gap-4'>
          <span className='font-semibold'>Estudiante/s:</span>
          <div>
            {thisclass.program.students.map((student) => (
              <div key={student._id}>{student.last_name}, {student.first_name}</div>
            ))}
          </div>
        </p>
        <p className='flex gap-4'>
          <span className='font-semibold'>Fecha Inicio: </span>
          { thisclass.daytime ? new Date(thisclass.daytime).toLocaleDateString() : '-'}
        </p>
        <p className='flex gap-4'>
          <span className='font-semibold'>Hora:</span>
          { thisclass.daytime ? gettingHourClass(thisclass.daytime, thisclass.program.duration_hours) : '-' }
        </p>
      </div>
    </div>
  );
}

export default CardClass;
