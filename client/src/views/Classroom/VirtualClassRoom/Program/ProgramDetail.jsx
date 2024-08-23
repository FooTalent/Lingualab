import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAppStore } from '../../../../store/useAppStore';
import { createClass, deleteClass, getProgramById, updateClass, updateProgram } from '../../../../services/programs.services';
import Modal from '../../../../components/Modal';
import CreateClassForm from './CreateClassForm';
import ClassroomCard from './ClassroomCard';
import { LEVELS_MAP } from '../../../../utils/valueLists';
import BackButton from '../../../../components/BackButtom';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import EditVCRForm from './EditVCRForm';
import CreatedClass from '../Class/CreatedClass'
import logo from '/CreasteUnaClase.png';
import popUp from '/Popup_EliminarClase.png'
import EditClassForm from './EditClassForm';
import Spinner from '../../../../components/Spinner/Spinner'

const ProgramDetail = () => {
  const { eid } = useParams();
  const { user } = useAppStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalSize, setModalSize] = useState({})

  // Edit Program
  const [program, setProgram] = useState(null);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  // Create Class
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [isCreatedClass, setIsCreatedClass] = useState(false);
  const [newClassId, setNewClassId] = useState(null);
  // Edit Class
  const [isEditClassModalsOpen, setIsEditClassModalsOpen] = useState(false);
  const [editClass, setEditClass] = useState(null);
  const [isEditClass, setIsEditClass] = useState(false);
  // Delete Class
  const [idDeleteClass, setIdDeleteClass] = useState(false);
  const [deleteClassModal, setDeleteClassModal] = useState(false);

  // Load data
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

  useEffect(() => {
    if (location.state === 'edit') {
      setIsModalEditOpen(true);
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      let size = {};

      if (window.innerWidth >= 1024) {
        size = { add: 'medium', addSmall: 'small', created: 'xsmall' };
      } else if (window.innerWidth >= 768) {
        size = { add: 'full', addSmall: 'medium', created: 'small' };
      } else {
        size = { add: 'full', addSmall: 'full', created: 'medium' };
      }

      setModalSize(size);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Functions
  const handleEditProgram = async (newProgram) => {
    try {
      await updateProgram(user.token, eid, newProgram);
      setRefresh(!refresh);
      setIsModalEditOpen(false);
    } catch (error) {
      console.error('Error al actualizar el programa', error);
      setError(error.message);
    }
  };

  const handleCreateClass = async (classData) => {
    try {
      const newClass = await createClass(user.token, classData);
      setNewClassId(newClass.data._id)
      setRefresh(!refresh);
      setIsCreateClassModalOpen(false);
      setIsCreatedClass(true);
    } catch (error) {
      console.error('Error al crear la clase', error);
      setError(error.message);
    }
  };

  const handleShowEditClass = (editClassId) => {
    const classToEdit = program.classes.find(cls => cls._id === editClassId)
    setEditClass(classToEdit)
    if (editClass) setIsEditClassModalsOpen(true);
  };

  const handleEditClass = async (classId, classData) => {
    try {
      setIsEditClassModalsOpen(false);
      await updateClass(user.token, classId, classData);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Error al actualizar la clase', error);
      setError(error.message);
    }
  };

  const handleDeleteClass = (id) => {
    setIdDeleteClass(id)
    setDeleteClassModal(true)
  }

  const handleConfirmDelete = async () => {
    await deleteClass(user.token, idDeleteClass)
    setDeleteClassModal(false)
    setRefresh(prevRefresh => !prevRefresh)
  }

  const handleEditContentClass = (classId) => {
    navigate(`/aulavirtual/clase/${classId}`);
  };

  if (loading) return <Spinner />
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto lg:p-4">
      <div className='flex flex-col lg:flex-row justify-between items-start gap-y-8 lg:items-center lg:justify-between'>
        <BackButton />

        <div className="order-3 md:order-2 w-full md:self-center flex justify-center items-center truncate max-w-[90%] lg:max-w-[40%]">
          <span className="hidden text-white px-2 py-1 rounded mr-2" style={{ backgroundColor: LEVELS_MAP[program.level] }}>{program.level}</span>
          <h1 className="max-w-full text-3xl font-bold truncate">{program.title}</h1>
        </div>

        <div className='order-2 lg:order-3 w-full md:w-fit md:self-center grid grid-cols-2 lg:flex items-center gap-6'>
          <button
            className={`flex items-center justify-center gap-4 whitespace-nowrap bg-card hover:bg-Yellow font-extrabold text-Yellow hover:text-card border-2 border-card hover:border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
            onClick={() => setIsModalEditOpen(true)}
          >
            Editar <EditIcon />
          </button>

          <button
            className={`flex items-center justify-center gap-4 whitespace-nowrap bg-Yellow hover:bg-card font-extrabold text-card hover:text-Yellow border-2 border-Yellow hover:border-card rounded-lg py-3 px-4 ease-linear duration-150`}
            onClick={() => setIsCreateClassModalOpen(true)}
          >
            Crear clase<AddIcon />
          </button>
        </div>
      </div>

      <div className="mt-6">
        {program.description ? (
          <p className="mb-2"><strong>Descripción:</strong> {program.description}</p>
        ) : null}
        <p className="mb-2"><strong>Idioma:</strong> {program.language}</p>
        <p className="mb-2"><strong>Docente:</strong> {program.teacher.last_name}, {program.teacher.first_name}</p>
        {program.students.length > 0 && (
          <div className="flex flex-nowrap gap-2 mb-4">
            <h3 className="font-semibold">Estudiante/s:</h3>
            {program.students.map((student, index) => {
              let programLenght = program.students.length
              let isTheLast = programLenght === (index + 1)

              return (
                <span key={student._id}>{student.last_name}, {student.first_name} {!isTheLast ? '-' : ''}</span>
              )
            })}
          </div>
        )}
      </div>

      {program.classes.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {program.classes.map((classroom) => (
            <ClassroomCard
              key={classroom._id}
              classroom={classroom}
              editFunction={handleShowEditClass}
              editContentFunction={handleEditContentClass}
              deleteFunction={handleDeleteClass}
            />
          ))}
        </div>
      ) : (
        <p>No tiene clases cargadas</p>
      )}

      {/* Edit Program Modal */}
      <Modal isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} title="Editar Aula" modalSize={modalSize.add}>
        <EditVCRForm
          onSubmit={handleEditProgram}
          program={program}
          onClose={() => setIsModalEditOpen(false)}
          teacherId={''}
          token={user.token}
        />
      </Modal>

      {/* Create Class Modal */}
      <Modal isOpen={isCreateClassModalOpen} onClose={() => setIsCreateClassModalOpen(false)} title="Crear Clase" modalSize={modalSize.addSmall}>
        <CreateClassForm
          programData={program}
          onSubmit={handleCreateClass}
          onClose={() => setIsCreateClassModalOpen(false)}
        />
      </Modal>

      {/* Confirmation Modal for created class */}
      <Modal isOpen={isCreatedClass} onClose={() => setIsCreatedClass(false)} modalSize={modalSize.created}>
        <CreatedClass
          onClose={() => setIsCreatedClass(false)}
          logo={logo}
          pathNewClass={`/workspace/class/${newClassId}`}
        />
      </Modal>

      {/* Edit Class Modal */}
      <Modal isOpen={isEditClassModalsOpen} onClose={() => setIsEditClassModalsOpen(false)} title="Modificar Clase" modalSize={modalSize.add}>
        <EditClassForm
          classData={editClass}
          onSubmit={handleEditClass}
          onClose={() => setIsEditClassModalsOpen(false)}
        />
      </Modal>

      {/* Confirmation Modal for deleted class */}
      <Modal modalSize={modalSize.created} isOpen={deleteClassModal}>
        <div className='flex flex-col gap-8'>
          <img src={popUp} alt="Eliminar clase" />

          <div className='flex flex-col xl:grid grid-cols-2 gap-6'>
            <button
              onClick={() => setDeleteClassModal(false)}
              className="border border-Purple bg-white hover:bg-Purple text-Purple hover:text-white font-extrabold py-3 px-8 rounded-lg mr-2 ease-linear duration-150"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmDelete}
              className="border border-Purple bg-Purple hover:bg-PurpleHover text-white font-extrabold py-3 px-8 rounded-lg ease-linear duration-150"
            >
              Eliminar clase
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProgramDetail;
