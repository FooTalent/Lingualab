import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { createClass, getProgramById } from '../../../../services/programs.services';
import Modal from '../../../../components/Modal';
import CreateClassForm from './CreateClassForm';
import ClassroomCard from './ClassroomCard';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import BackButton from '../../../../components/BackButtom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const ProgramDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [program, setProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
    <div className="container mx-auto">
      <div className='flex justify-between items-center'>
        <BackButton />

        <div className="flex items-center gap-8">
          <span className="text-white text-lg font-extrabold py-3 px-4 rounded-lg" style={{ backgroundColor: LEVELS_MAP[program.level] }}>{program.level}</span>
          <h1 className="text-card text-customSubTitle font-semibold">{program.title}</h1>
        </div>

        <div className='flex items-center gap-6'>
          <button
            className={`flex items-center gap-4 bg-card hover:bg-Yellow font-extrabold text-Yellow hover:text-card border-2 border-card hover:border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
            onClick={undefined}
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

      <div className="mt-6">
        {program.description ? (
          <p className="mb-2"><strong>Descripción:</strong> {program.description}</p>
        ) : null}
        <p className="mb-2"><strong>Idioma:</strong> {program.language}</p>
        <p className="mb-4"><strong>Profesor:</strong> {program.teacher.last_name}, {program.teacher.first_name}</p>
      </div>

      {program.classes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Clase">
        <CreateClassForm
          programData={program}
          onSubmit={handleCreateClass}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProgramDetail;
