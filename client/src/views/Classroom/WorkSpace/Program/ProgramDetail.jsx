import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { createClass, getProgramById } from '../../../../services/programs.services';
import Modal from '../../../../components/Modal';
import CreateClassForm from './CreateClassForm';
import ClassroomCard from './ClassroomCard';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import BackButton from '../../../../components/BackButtom';

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
    <div className="container mx-auto p-4">
      <div className='flex flex-row justify-between items-center mb-4'>
        <BackButton />
        <div className="flex items-center">
          <span className="text-white px-2 py-1 rounded mr-2" style={{backgroundColor: LEVELS_MAP[program.level]}}>{program.level}</span>
          <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
        </div>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        >
          Crear Clase
        </button>
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
