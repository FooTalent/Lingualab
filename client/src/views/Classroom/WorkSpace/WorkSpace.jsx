import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { createProgram, getPrograms } from '../../../services/programs.services';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import NavWorkSpace from '../NavWorkSpace';
import CardList from './Class/CardList';
import CreatedProgram from './Program/CreatedProgram';
import logo from '/CreasteUnPrograma.png';
import CreateProgramForm from './Program/CreateProgramForm';
import ProgramCard from './Program/ProgramCard';

const WorkSpace = () => {
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
  }, [user, userDetail, refresh]);

  const handleCreateProgram = async (programData) => {
    try {
      const newProgram = await createProgram(user.token, userDetail._id, programData);
      setNewProgramId(newProgram.data._id);
      setIsCreated(true);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al crear el programa', error);
      setError(error.message);
    }
  };

  const buttonFunction = (idProgram) => {
    navigate(`/workspace/programas/${idProgram}`);
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
      <NavWorkSpace setModal={setIsModalOpen} buttonDescription={"Crear Programa"} route={'workspace'} />

      {
        loading ? (
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
        ) : <CardList data={programs} CardComponent={ProgramCard} buttonFunction={buttonFunction} />
      }

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Programa" modalSize={'medium'}>
        <CreateProgramForm
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
          pathProgram={`/workspace/programas/${newProgramId}`}
          pathNewClass={`/workspace/programas/${newProgramId}`}
        />
      </Modal>
    </div>
  );
}
// `/workspace/programas/${programId}/create-class`
export default WorkSpace;
