import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { createProgram, getPrograms } from '../../../services/programs.services';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import NavWorkSpace from '../SubComponents/NavWorkSpace';
import logo from '/CreasteUnPrograma.png';
import ProgramCard from './Main/ProgramCard';
import CreateProgramForm from './Main/CreateProgramForm';
import CardList from '../SubComponents/CardList';
import CreatedProgram from '../SubComponents/CreatedProgram';
import sinProgramas from '/ImagesWorkspace/NoHayProgramas.png'
import { removeAccents } from '../../../utils/removeAccents';
import Spinner from '../../../components/Spinner/Spinner';

const WorkSpace = () => {
  const [programs, setPrograms] = useState([]);
  const [allPrograms, setAllPrograms] = useState([])
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [newProgramId, setNewProgramId] = useState(null);
  const [newProgramData, setNewProgramData] = useState(null);
  const [modalSize, setModalSize] = useState({})
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
          setAllPrograms(response.data);
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

  useEffect(() => {
    const handleResize = () => {
      let size = {};

      if (window.innerWidth >= 1024) {
        size = { add: 'medium', created: 'xsmall' };
      } else if (window.innerWidth >= 768) {
        size = { add: 'full', created: 'small' };
      } else {
        size = { add: 'full', created: 'medium' };
      }

      setModalSize(size);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCreateProgram = async (programData) => {
    try {
      if (programData) {
        const newProgram = await createProgram(user.token, userDetail._id, programData);
        setNewProgramId(newProgram.data._id);
        setNewProgramData(programData); 
        setIsCreated(true);
        setIsModalOpen(false);

        setTimeout(() => {
          setIsCreated(false)
        }, 2000);
      }
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
      ...prevPrograms,
      { _id: newProgramId, ...newProgramData },
    ]);
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleSearchPrograms = (term) => {
    if (!term) {
      setRefresh(prevRefresh => !prevRefresh)
    }
    const filteredPrograms = allPrograms.filter(program => {
      const normalizedTitle = removeAccents(program.title.toLowerCase())
      return normalizedTitle.includes(term.toLowerCase())
    })
    setPrograms(filteredPrograms)
  }

  return (
    <div className="container mx-auto flex flex-col gap-11">
      <NavWorkSpace
        setModal={setIsModalOpen}
        buttonDescription={"Crear Programa"}
        route={'workspace'}
        onSearch={handleSearchPrograms} />

      {
        loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : programs.length === 0 ? (
          <div className="min-h-screen flex">
            <img src={sinProgramas} alt="No hay programas creados" className='m-auto' />
          </div>
        ) : <CardList data={programs} CardComponent={ProgramCard} buttonFunction={buttonFunction} refresh={setRefresh} />
      }

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Crear Programa" modalSize={modalSize.add}>
        <CreateProgramForm
          onSubmit={handleCreateProgram}
          onClose={() => setIsModalOpen(false)}
          teacherId={userDetail._id}
          token={user.token}
        />
      </Modal>

      <Modal isOpen={isCreated} onClose={handleModalClose} modalSize={modalSize.created}>
        <CreatedProgram
          onClose={handleModalClose}
          logo={logo}
          pathProgram={`/workspace/programas/${newProgramId}`}
          pathNewClass={`/workspace/programas/${newProgramId}`}
          label={'¿Desea crear la clase o ir al programa creado?'}
          closeLabel={'Ir al programa'}
        />
      </Modal>
    </div>
  );
}
export default WorkSpace;
