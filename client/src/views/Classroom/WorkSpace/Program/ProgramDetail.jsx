import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { createClass, getProgramById, updateProgram } from '../../../../services/programs.services';
import Modal from '../../../../components/Modal';
import CreateClassForm from './CreateClassForm';
import ClassroomCard from './ClassroomCard';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import BackButton from '../../../../components/BackButtom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CreatedClass from '../Class/CreatedClass'
import logo from '/CreasteUnaClase.png';
import ProgramInfo from './ProgramInfo';
import EditProgramForm from './EditProgramForm';

const ProgramDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [program, setProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false)
  const [isCreated, setIsCreated] = useState(false)
  const navigate = useNavigate();

  console.log(program)

  useEffect(() => {
    if (user && user.token) {
      const fetchProgram = async () => {
        try {
          setLoading(true);
          const response = await getProgramById(user.token, eid);
          setProgram(response);
        } catch (error) {
          console.error('Error buscando el programa', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchProgram();
    } else {
      setLoading(false);
    }
  }, [user, eid, refresh]);

  const handleEditProgram = async (data) => {
    try {
      const editedProgram = Object.assign(program, data);
      const newProgram = await updateProgram(user.token, program._id, editedProgram);
      setProgram(newProgram)
      setIsModalEditOpen(false)
    } catch (error) {
      console.error('Error al editar el programa', error)
      setError(error.message)
    }
  }

  const handleCreateClass = async (classroomData) => {
    try {
      const newClassRoom = await createClass(user.token, classroomData);
      console.log(newClassRoom);
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear la clase', error);
      setError(error.message);
    }
  };

  const handleEditClassroom = (classroomId) => {
    navigate(`/workspace/class/${classroomId}`);
  };

  if (loading) return <p className="text-center">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto flex flex-col gap-8">
      <div className='flex justify-between items-center'>
        <BackButton />

        <div className="flex items-center gap-8">
          <span className="text-white text-lg font-extrabold py-3 px-4 rounded-lg" style={{ backgroundColor: LEVELS_MAP[program.level] }}>{program.level}</span>
          <h1 className="text-card text-customSubTitle font-semibold">{program.title}</h1>
        </div>

        <div className='flex items-center gap-6'>
          <button
            className={`flex items-center gap-4 bg-card hover:bg-Yellow font-extrabold text-Yellow hover:text-card border-2 border-card hover:border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
            onClick={() => setIsModalEditOpen(true)}
          >
            Editar <EditIcon />
          </button>
          <button
            className={`flex items-center gap-4 bg-Yellow hover:bg-card font-extrabold text-card hover:text-Yellow border-2 border-Yellow hover:border-card rounded-lg py-3 px-4 ease-linear duration-150`}
            onClick={() => setIsModalOpen(true)}
          >
            Crear <AddIcon />
          </button>
        </div>
      </div>

      <ProgramInfo program={program} />

      {program.classes.length > 0 ? (
        <div className="flex flex-col justify-evenly gap-6">
          {program.classes.map((classroom) => (
            <ClassroomCard
              key={classroom._id}
              classroom={classroom}
              buttonFunction={handleEditClassroom}
            />
          ))}
        </div>
      ) : (
        <p>No tiene clases cargadas</p>
      )}

      <Modal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} title="Editar Programa">
        <EditProgramForm
          program={program}
          onSubmit={handleEditProgram}
          onClose={() => setIsModalEditOpen(false)}
        />
      </Modal>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Clase">
        <CreateClassForm
          programData={program}
          onSubmit={handleCreateClass}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={isCreated} onClose={() => setIsCreated(false)} modalSize={'small'}>
        <CreatedClass
          // onClose={handleModalClose}
          logo={logo}
        // pathProgram={`/workspace/programas/${newProgramId}`}
        // pathNewClass={`/workspace/programas/${newProgramId}`}
        />
      </Modal>
    </div>
  );
};

export default ProgramDetail;
