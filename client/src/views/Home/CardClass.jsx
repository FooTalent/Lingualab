import React, { useState } from 'react';
import gettingHourClass from '../../utils/gettingHoursClass';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShareIcon from '@mui/icons-material/Share';
import editarPrograma from '/editarPrograma.svg'
import duplicar from '/duplicar.svg'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Options from '../../components/user/classes/Options';

const CardClass = ({ thisclass, buttonFunction, deleteFunction }) => {
  const [state, setState] = useState(false);

  
  const handleOptions = (e) => {
    e.stopPropagation();
    setState(!state);
  };

  const handleButton = (e) => {
    e.stopPropagation();
    buttonFunction(thisclass._id);
  }

  const links = [
    { function: () => {}, label: <><PersonAddIcon /> Invitar estudiante/s:</>, disabled: true },
    { path: null, state: 'edit', label: <><ShareIcon /> Compartir</>, disabled: true },
    { path: `/aulavirtual/aula/${thisclass.program._id}`, state: 'edit', label: <><img src={editarPrograma} alt='Editar aula' />Editar aula</> },
    { path: ``, label: <><img src={duplicar} alt='Duplicar Programa' />Duplicar aula</>, disabled: true },
    { path: ``, label: <><DeleteIcon />Eliminar aula</>, function: deleteFunction, disabled: true },
  ];

  return (
    <div className="shadow-home mx-auto rounded-lg max-w-[357px] h-[161px] p-4 cursor-pointer flex flex-nowrap">
      <div className="flex flex-col justify-between h-full">
        <h2
          className="p-0 text-base font-bold truncate"
        >
          {thisclass.title}
        </h2>
        <p className='flex text-sm gap-4'>
          <span className='font-semibold'>Estudiante/s:</span>
          <div>
            {thisclass.program.students.map((student) => (
              <div key={student._id}>{student.last_name}, {student.first_name}</div>
            ))}
          </div>
        </p>
        <p className='flex text-sm gap-4'>
          <span className='font-semibold'>Fecha Inicio: </span>
          { thisclass.daytime ? new Date(thisclass.daytime).toLocaleDateString() : '-'}
        </p>
        <p className='flex text-sm gap-4'>
          <span className='font-semibold'>Hora:</span>
          { thisclass.daytime ? gettingHourClass(thisclass.daytime, thisclass.program.duration_hours) : '-' }
        </p>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className='relative'>
          <button
            onClick={(e) => handleOptions(e)}
          >
            <MoreVertIcon className='text-Purple' />
          </button>
          <Options id={thisclass._id} state={state} links={links} />
        </div>
        <button
          className="bg-Purple hover:bg-PurpleHover text-white whitespace-nowrap px-4 py-2 rounded-lg font-extrabold ease-linear duration-150"
          onClick={handleButton}
        >
          Ver clases
        </button>
      </div>
    </div>
  );
}

export default CardClass;
