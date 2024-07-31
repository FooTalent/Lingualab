import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore';
import ProgramCard from './ProgramCard';
import { createProgram, getPrograms } from '../../services/programs.services';
import { useNavigate  } from 'react-router-dom';
import CreateProgramForm from './CreateProgramForm';
import Modal from '../../components/Modal';

const WorkSpace = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, userDetail } = useAppStore()
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      const fetchPrograms = async () => {
        try {
          setLoading(true);
          const response = await getPrograms(user.token, userDetail._id);
          if (response.isError) {
            throw new Error(response.message);
          }
          setPrograms(response.data);
        } catch (error) {
          console.error('Error al cargar los Programas', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPrograms();
    } else {
      setLoading(false);
    }
  }, [user, userDetail]);

  const handleCreateProgram = async (programData) => {
    try {
      const newProgram = await createProgram(user.token, userDetail._id, programData);
      setPrograms([...programs, newProgram]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear el programa', error);
      setError(error.message);
    }
  };

  function buttonFunction (idProgram) {
    navigate(`/programas/${idProgram}`)
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Área de Trabajo</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        > Crear Nuevo Programa
        </button>
      </div>

      {loading ? (
        <p className="text-center">Cargando Datos...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : programs.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-700">No hay programas creados. ¡Crea uno ahora!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Crear Programa
          </button>
        </div>
      ) : (
        <div className="programs-container flex flex-wrap justify-center">
          {programs.map((program) => (
            <ProgramCard key={program._id} program={program} buttonFunction={buttonFunction} />
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Programa">
        <CreateProgramForm onSubmit={handleCreateProgram} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default WorkSpace