import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../../store/useAppStore';
import { getVCRooms, createVCRoom } from '../../../services/programs.services';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import NavWorkSpace from '../SubComponents/NavWorkSpace'
import CardList from '../SubComponents/CardList';
import CreatedProgram from '../SubComponents/CreatedProgram';
import CreateVCRForm from './Main/CreateVCRForm';
import logo from '/ImagesVCR/CreasteUnAula.png';
import ProgramCard from './Main/ProgramCard';
import sinAulas from '/ImagesVCR/NoHayAulas.png'
import { removeAccents } from '../../../utils/removeAccents';
import Spinner from '../../../components/Spinner/Spinner';

const VirtualClassRoom = () => {
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
          const response = await getVCRooms(user.token, userDetail._id);
          if (response.isError) {
            throw new Error(response.message);
          }
          setPrograms(response.data);
          setAllPrograms(response.data);
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

  useEffect(() => {
    const handleResize = () => {
      let size = {};

      if (window.innerWidth >= 1024) {
        size = { add: 'medium', created: 'xsmall'};
      } else if (window.innerWidth >= 768) {
        size = { add: 'full', created: 'small'};
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
      const newProgram = await createVCRoom(user.token, userDetail._id, programData);
      setNewProgramId(newProgram.data._id);
      setNewProgramData(programData); 
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
      ...prevPrograms,
      { _id: newProgramId, ...newProgramData },
    ]);
    setRefresh((prevRefresh) => !prevRefresh);
  };

  const handleSearchVCR = (term) => {
    if (!term) {
      setRefresh(prevRefresh => !prevRefresh)
    }
    const filteredVCR = allPrograms.filter(program => {
      const normalizedTitle = removeAccents(program.title.toLowerCase())
      return normalizedTitle.includes(term.toLowerCase())
    })
    setPrograms(filteredVCR)
  }

  return (
    <div className="container mx-auto flex flex-col gap-6 lg:gap-11">
      <NavWorkSpace
        setModal={setIsModalOpen}
        buttonDescription={"Crear Aula"}
        route={'aulavirtual'}
        onSearch={handleSearchVCR} />

      {loading ? (
        <div className='flex justify-center items-center min-h-80'>
          <Spinner />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Error: {error}</p>
      ) : programs.length === 0 ? (
        <div className="min-h-screen flex">
          <img src={sinAulas} alt="No hay aulas creadas" className='m-auto' />
        </div>
      ) : (
        <CardList
          data={programs}
          CardComponent={ProgramCard}
          buttonFunction={buttonFunction}
          refresh={setRefresh}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} modalSize={modalSize.add} title="Crear Aula">
        <CreateVCRForm
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
          pathProgram={`/aulavirtual/aula/${newProgramId}`}
          pathNewClass={`/aulavirtual/aula/${newProgramId}`}
          label={'¿Desea crear la clase o ir al aula creada?'}
          closeLabel={'Ir al aula'}
        />
      </Modal>
    </div>
  );
};

export default VirtualClassRoom;
