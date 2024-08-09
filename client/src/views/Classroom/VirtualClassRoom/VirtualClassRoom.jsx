import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { getVCRooms, createVCRoom } from '../../../services/programs.services';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import NavWorkSpace from '../SubComponents/NavWorkSpace'
import CardList from '../SubComponents/CardList';
import CreatedProgram from '../SubComponents/CreatedProgram';
import CreateVCRForm from './Main/CreateVCRForm';
import logo from '/CreasteUnPrograma.png';
import ProgramCard from './Main/ProgramCard';

const VirtualClassRoom = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [newProgramId, setNewProgramId] = useState(null);
  const { user, userDetail } = useAppStore();
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
          console.error('Error al cargar las aulas virtuales', error);
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
      setNewProgramId(newProgram.data._id);
      setIsCreated(true)
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear el aula virtual', error);
      setError(error.message);
    }
  };

  const buttonFunction = (idProgram) => {
    navigate(`/aulavirtual/aula/${idProgram}`);
  };

  const handleModalClose = () => {
    setIsCreated(false);
    setPrograms((prevPrograms) => [
      ...prevPrograms.filter((p) => p._id !== newProgramId),
      { _id: newProgramId, ...programData },
    ]);
    setRefresh(prevRefresh => !prevRefresh);
  };

  return (
    <div className="container mx-auto flex flex-col gap-11">
      <NavWorkSpace setModal={setIsModalOpen} buttonDescription={"Crear Aula"} route={'aulavirtual'} />

      {loading ? (
        <p className="text-center">Cargando Datos...</p>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : programs.length === 0 ? (
        <div className="text-center mt-8">
          <p className="text-gray-700">No hay aulas virtuales creadas. ¡Crea una ahora!</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Crear Aula
          </button>
        </div>
      ) : (
        <CardList 
          data={programs} 
          CardComponent={ProgramCard} 
          buttonFunction={buttonFunction} 
          refresh={setRefresh}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Aula">
        <CreateVCRForm 
          onSubmit={handleCreateProgram}
          onClose={() => setIsModalOpen(false)}
          teacherId={userDetail._id}
          token={user.token}
        />
      </Modal>

      <Modal isOpen={isCreated} onClose={handleModalClose} modalSize={'small'}>
        <CreatedProgram
          onClose={handleModalClose}
          logo={logo}
          pathProgram={`/aulavirtual/aula/${newProgramId}`}
          pathNewClass={`/aulavirtual/aula/${newProgramId}`}
        />
      </Modal>
    </div>
  );
};

export default VirtualClassRoom;
