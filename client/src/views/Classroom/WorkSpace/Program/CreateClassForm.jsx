import React, { useEffect, useState } from 'react';
import ButtonModal from '../../../../components/Form/ButtonModal';
import { getPrograms } from '../../../../services/programs.services';
import { useAppStore } from '../../../../store/useAppStore';
import InputField from '../../SubComponents/InputField';

const CreateClassForm = ({ programData, onSubmit, onClose }) => {
  const { user, userDetail } = useAppStore();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classroomData, setClassroomData] = useState({
    title: '',
    description: '',
    teacher: programData.teacher._id,
    language: programData.language,
    level: programData.level,
    program: programData._id ,
  });

  useEffect(() => {
    if (user && user.token) {
      const fetchPrograms = async () => {
        try {
          const response = await getPrograms(user.token, userDetail._id);
          setPrograms(response.data);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPrograms();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (field, value) => {
    if (field === 'program') {
      const selectedProgram = programs.find((program) => program._id === value);
      setClassroomData((prevData) => ({
        ...prevData,
        [field]: { label: selectedProgram.title, value: selectedProgram._id },
      }));
    } else {
      setClassroomData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...classroomData,
      title: classroomData.title || 'Sin título',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 text-card justify-evenly'
    >
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <InputField
            label="Título"
            name="title"
            value={classroomData.title}
            onChange={handleInputChange}
            placeholder='Escribe el nombre de la clase...'
          />

          <InputField
            label="Descripción"
            name="description"
            value={classroomData.description}
            onChange={handleInputChange}
            placeholder='Escribe una breve descripción...'
          />

          <div className="grid grid-cols-2 gap-8 mt-9">
            <ButtonModal buttonAction={onClose} type='prev' label='Cancelar' />
            <ButtonModal buttonAction={onSubmit} type='submit' label='Crear Clase' />
          </div>
        </>
      )}
    </form>
  );
};

export default CreateClassForm;
