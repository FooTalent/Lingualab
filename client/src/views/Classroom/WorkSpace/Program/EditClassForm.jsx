import React, { useState } from 'react';
import ButtonModal from '../../../../components/Form/ButtonModal';
import InputField from '../../SubComponents/InputField';

const EditClassForm = ({ classData, onSubmit, onClose }) => {
  const classId = classData._id
  const [classroomData, setClassroomData] = useState({
    title: classData.title,
    description: classData.description,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(classId, classroomData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4 text-card justify-evenly'
    >
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
        <ButtonModal buttonAction={onSubmit} type='submit' label='Modificar Clase' />
      </div>
    </form>
  );
};

export default EditClassForm;
