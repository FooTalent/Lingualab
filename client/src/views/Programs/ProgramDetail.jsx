import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { createClassroom, fetchProgramById } from '../../services/programs.services';
import Modal from './Modal';
import CreateClassroomForm from './CreateClassroomForm';
import ClassroomCard from './ClassroomCard';

const ProgramDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [program, setProgram] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // console.log(program); // <-- DESPUES ELIMINAR -----------------------------------------------------------------

  useEffect(() => {
    if (user && user.token) {
      const getProgram = async () => {
        try {
          setLoading(true);
          const response = await fetchProgramById(user.token, eid);
          setProgram(response);
        } catch (error) {
          console.error('Error fetching program', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      getProgram();
    } else {
      setLoading(false);
    }
  }, [user, eid, refresh]);

  const handleCreateClassroom = async (classroomData) => {
    try {
      const newClassRoom = await createClassroom(classroomData, user.token);
      console.log(newClassRoom);
      // Agrega cualquier lógica adicional después de crear la clase, como cerrar el modal
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear la clase', error);
      setError(error.message);
    }
  };
  const handleEditClassroom = (classroomId) => {
    navigate(`/classroom/${classroomId}`);
  };

  if (loading) return <p className="text-center">Cargando datos...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className='flex flex-row justify-between w-10/12'>
        <h1 className="text-3xl font-bold mb-4">{program.title}</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}> Crear Clase </button>
      </div>

      <div className="mt-6">
        <p className="mb-2"><strong>Descripción:</strong> {program.description}</p>
        <p className="mb-2"><strong>Nivel:</strong> {program.level}</p>
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
        <CreateClassroomForm
          programData={program}
          onSubmit={handleCreateClassroom}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProgramDetail;
