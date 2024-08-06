import React, { useState } from 'react';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Options from '../../../../components/user/classes/Options';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import crearAula from '/crearAulaCard.svg'
import editarPrograma from '/editarPrograma.svg'
import duplicar from '/duplicar.svg'
import Modal from '../../../../components/Modal';
import popUp from '/Popup_EliminarPrograma.png'
import { deleteProgram, duplicateProgram } from '../../../../services/programs.services';
import { useAppStore } from '../../../../store/useAppStore';



const ProgramCard = ({ program, buttonFunction, refresh }) => {
  const { user } = useAppStore();
  const [state, setState] = useState(false)
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

  const handleDuplicate = async (id) => {
    const response = await duplicateProgram(user.token, id)
    setState(!state)
    refresh(prev => !prev)
  }


  const links = [
    { path: `/`, label: <><img src={crearAula} alt='Crear Aula' />Crear aula a partir de este programa</> },
    { path: `/`, label: <><ShareIcon />Compartir</> },
    { path: `/workspace/programas/${program._id}`, state: 'edit', label: <><img src={editarPrograma} alt='Editar Programa' />Editar programa</> },
    { path: `/`, label: <><img src={duplicar} alt='Duplicar Programa' />Duplicar programa</>, function: handleDuplicate },
    { path: `/`, label: <><DeleteIcon />Eliminar programa</>, function: handleDelete },
  ]

  const handleOptions = () => {
    setState(!state)
  }

  return (
    <div className="relative flex flex-nowrap justify-between shadow-cardContainer rounded-xl p-4">
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

        <p className='flex gap-4'>
          <span className='font-semibold'>Idioma:</span>
          {program.language || '-'}
        </p>

        <p className='flex gap-4'>
          <span className='font-semibold'>Descripción:</span>
          {program.description || "-"}
        </p>
      </div>

      <div className="flex flex-col justify-between items-end">
        <button
          onClick={handleOptions}
        >
          <MoreVertIcon className='text-Purple' />
        </button>
        <button
          className="bg-Purple hover:bg-PurpleHover text-white px-4 py-2 rounded-lg font-extrabold ease-linear duration-150"
          onClick={() => buttonFunction(program._id)}
        >
          Ver clases
        </button>
      </div>

      <Options id={program._id} state={state} links={links} />
      <Modal modalSize={'small'} isOpen={deleteModal}>
        <div className="flex justify-center ">
          <img src={popUp} alt="Eliminar programa" />
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setDeleteModal(false)}
            className="w-full px-4 py-2 border border-Purple text-Purple  rounded-md hover:bg-Purple hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirmDelete}
            className="w-full px-4 py-2 bg-Purple text-white rounded-md hover:bg-PurpleHover"
          >
            Eliminar programa
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProgramCard;
