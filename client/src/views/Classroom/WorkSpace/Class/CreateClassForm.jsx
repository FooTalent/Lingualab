import React, { useEffect, useState } from 'react';
import { LEVELS, LEVELS_MAP } from '../../../../utils/valueLists';
import DropdownSelect from '../../SubComponents/DropdownSelect';
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
    program: { label: programData.title, value: programData._id },
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
      program: classroomData.program.value,
      title: classroomData.title || 'Sin título',
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 text-card justify-evenly'
    >
      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <DropdownSelect
            label="Programa"
            options={programs.map((program) => ({ label: program.title, value: program._id }))}
            selectedOption={classroomData.program.label}
            onSelect={(value) => handleSelectChange('program', value)}
          />

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

          <DropdownSelect
            label="Nivel"
            name='level'
            options={LEVELS.map((level) => level.data)}
            selectedOption={classroomData.level}
            onSelect={(value) => handleSelectChange('level', value)}
          />

          <div className="grid grid-cols-2 gap-8">
            <ButtonModal buttonAction={onClose} type='prev' label='Cancelar' />
            <ButtonModal buttonAction={onSubmit} type='submit' label='Crear Clase' />
          </div>
        </>
      )}
    </form>
  );
};

export default CreateClassForm;
