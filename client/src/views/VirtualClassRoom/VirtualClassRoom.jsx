import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store/useAppStore';
import { getVCRooms, createVCRoom } from '../../services/programs.services';
import { useNavigate } from 'react-router-dom';
import CreateVCRForm from './CreateVCRForm';
import Modal from '../../components/Modal';
import NavVirtualClassRoom from '../WorkSpace/NavWorkSpace';
import ProgramList from '../WorkSpace/ProgramList';

const VirtualClassRoom = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, userDetail } = useAppStore()
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      const fetchPrograms = async () => {
        try {
          setLoading(true);
          const response = await getVCRooms(user.token, userDetail._id);
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
  }, [user, userDetail, refresh]);

  const handleCreateProgram = async (programData) => {
    try {
      const newProgram = await createVCRoom(user.token, userDetail._id, programData);
      setPrograms([...programs, newProgram]);
      setIsModalOpen(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error al crear el programa', error);
      setError(error.message);
    }
  };

  function buttonFunction (idProgram) {
    navigate(`/aulavirtual/aula/${idProgram}`)
  }
  console.log(programs);

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Aula Virtual</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsModalOpen(true)}
        > Crear Nueva Aula
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => navigate(`/workspace/`)}
        > Diseñar Programas
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
            <ProgramCard
              key={program._id}
              program={program}
              buttonFunction={buttonFunction}
              />
          ))}
        </div>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Aula">
        <CreateVCRForm 
          onSubmit={handleCreateProgram}
          onClose={() => setIsModalOpen(false)}
          techerId={userDetail._id}
          token={user.token}
        />
      </Modal>
    </div >
  );
}

export default VirtualClassRoom