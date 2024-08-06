import React, { useState } from 'react';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Options from '../../../../components/user/classes/Options';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
// import crearAula from '/crearAulaCard.svg'
import editarPrograma from '/editarPrograma.svg'
import duplicar from '/duplicar.svg'

const ProgramCard = ({ program, buttonFunction }) => {
  const [state, setState] = useState(false);

  const links = [
    //{ path: `/`, label: <><img src={crearAula} alt='Crear Aula' />Crear aula a partir de este programa</> },
    { path: `/`, label: <><ShareIcon />Compartir</> },
    { path: `/`, label: <><img src={editarPrograma} alt='Editar aula' />Editar aula</> },
    { path: `/`, label: <><DeleteIcon />Eliminar programa</> },
  ];

  const handleOptions = (e) => {
    e.stopPropagation();
    setState(!state);
  };

  const handleButton = (e) => {
    e.stopPropagation();
    buttonFunction(program._id);
  }

  return (
    <div
      className="relative flex flex-nowrap justify-between shadow-cardContainer rounded-xl p-4"
      onClick={() => setState(false)}
    >
      <div className='flex flex-col gap-4 w-9/12'>
        <div className="flex items-center gap-6 text-lg">
          <div
            className="flex items-center text-white py-2 px-4 rounded-lg font-medium"
            style={{ backgroundColor: LEVELS_MAP[program.level] }}
          >
            {program.level}
          </div>
          <h2
            className="p-0 text-lg font-bold truncate"
            style={{ maxWidth: 'calc(100% - 8rem)' }}
          >
            {program.title}
          </h2>
        </div>

        {program.students.map((student) => (
          <p key={student._id} className='flex gap-2'>
            {student.last_name}, {student.first_name}
          </p>
        ))}

        <p className='flex gap-4'>
          <span className='font-semibold'>Fecha Inicio:</span>
          {program.first_class || '-'}
        </p>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button
          onClick={(e) => handleOptions(e)}
        >
          <MoreVertIcon className='text-Purple' />
        </button>
        <button
          className="bg-Purple hover:bg-PurpleHover text-white px-4 py-2 rounded-lg font-extrabold ease-linear duration-150"
          onClick={(e) => handleButton(e)}
        >
          Ver clases
        </button>
      </div>

      <Options id={program._id} state={state} links={links} />
    </div>
  );
};

export default ProgramCard;
