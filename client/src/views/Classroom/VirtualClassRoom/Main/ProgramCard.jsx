import React, { useState } from 'react';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Options from '../../../../components/user/classes/Options';  
import DeleteIcon from '@mui/icons-material/Delete';
import editarPrograma from '/editarPrograma.svg'
import { deleteProgram } from '../../../../services/programs.services';
import { useAppStore } from '../../../../store/useAppStore';
import Modal from '../../../../components/Modal';
import popUp from '/ImagesVCR/EliminarAula.png'
import ButtonModal from '../../../../components/Form/ButtonModal';
import ShareIcon from '@mui/icons-material/Share';

const ProgramCard = ({ program, buttonFunction, refresh }) => {
  const { user } = useAppStore();
  const [state, setState] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  const [idProgram, setIdProgram] = useState('')

  const handleDelete = (id) => {
    setState(!state)
    setDeleteModal(true)
    setIdProgram(id)
  }

  const handleConfirmDelete = async () => {
    const response = await deleteProgram(user.token, idProgram)
    setDeleteModal(false)
    refresh(prevRefresh => !prevRefresh)
  }

  const links = [
    { path: null, state: 'edit', label: <><ShareIcon /> Compartir</>, disabled: true },
    { path: `/aulavirtual/aula/${program._id}`, state: 'edit', label: <><img src={editarPrograma} alt='Editar aula' />Editar aula</> },
    { path: ``, label: <><DeleteIcon />Eliminar aula</>, function: handleDelete },
  ];

  const handleOptions = (e) => {
    e.stopPropagation();
    setState(!state);
  };

  const handleButton = (e) => {
    e.stopPropagation();
    buttonFunction(program._id);
  }

  const gettingHourClass = (date, duration) => {
    let startDate = new Date(date)

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }

    const start = startDate.toLocaleTimeString('en-EN', options)
    startDate.setHours(startDate.getHours() + duration)
    const end = startDate.toLocaleTimeString('en-EN', options)

    return `${start} - ${end}`
  }

  return (
    <div
      className="relative flex flex-nowrap justify-between shadow-cardContainer rounded-xl p-4"
      onClick={() => setState(false)}
    >
      <div className='flex flex-col gap-3 w-9/12'>
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

        <p className='flex gap-2'>
          <span className='font-semibold'>Alumno/s:</span>
            {
              program.students.length > 0 ?
                (program.students.map((student) => 
                  student ? (
                  `${student.last_name}, ${student.first_name}; `
                  ) : (
                  '-'
                  )
                )) : '-'
            }
        </p>

        <p className='flex gap-4'>
          <span className='font-semibold'>Fecha Inicio:</span>
          {program.first_class ? new Date(program.first_class).toLocaleDateString() : '-'}
        </p>
        <p className='flex gap-4'>
          <span className='font-semibold'>Hora:</span>
          {
            program.first_class ?
            gettingHourClass(program.first_class, program.duration_hours) :
            '-'
          }
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
      <Modal modalSize={'xsmall'} isOpen={deleteModal}>
        <div className='flex flex-col gap-8'>
          <div className="flex justify-center ">
            <img src={popUp} alt="Eliminar aula" />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <ButtonModal buttonAction={() => setDeleteModal(false)} type={'prev'} label={'Cancelar'} />
            <ButtonModal buttonAction={handleConfirmDelete} label={'Eliminar aula'} />
          </div>
        </div>

      </Modal>
    </div>
  );
};

export default ProgramCard;
