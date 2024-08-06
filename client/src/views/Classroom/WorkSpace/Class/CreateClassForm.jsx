import React, { useState } from 'react';
import { LEVELS, LEVELS_MAP } from '../../../../utils/valueLists';
import DropdownSelect from '../../DropdownSelect';
import ButtonModal from '../../../../components/Form/ButtonModal';

const CreateClassForm = ({ programData, onSubmit, onClose }) => {
  const [classroomData, setClassroomData] = useState({
    duration_hours: 1,
    teacher: programData.teacher._id,
    language: programData.language,
    level: programData.level,
    program: programData._id
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroomData({
      ...classroomData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(classroomData);
  };

  const testPrograms = [

  ]

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-2 text-card justify-evenly'
    >
      <div className='grid grid-cols-2 gap-4'>
        <DropdownSelect
          label="Programa"
          options={testPrograms}
          selectedOption={classroomData.program}
          onSelect={handleInputChange}
        />

        <DropdownSelect
          label="Nivel"
          name='level'
          options={LEVELS.map(level => level.data)}
          selectedOption={classroomData.level}
          onSelect={handleInputChange}
        />
      </div>

      <div className="flex flex-col gap-2 font-medium">
        <label className="p-0 text-custom">Título</label>
        <input
          type="text"
          name="title"
          value={classroomData.title}
          onChange={handleInputChange}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe el nombre de la clase...'
        />
      </div>

      <div className="flex flex-col gap-2 font-medium">
        <label className="p-0 text-custom">Descripción</label>
        <input
          type="text"
          name="description"
          value={classroomData.description}
          onChange={handleInputChange}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe una breve descripción...'
        />
      </div>

      <DropdownSelect
        label="Estudiantes"
        name='students'
        icon={true}
        options={[]}
        selectedOption={classroomData.students}
        onSelect={handleInputChange}
      />

      <div className='grid grid-cols-2 gap-4'>
        <div className="flex flex-col gap-3 font-medium">
          <label className="p-0 text-custom">Feccha inicio</label>
          <input
            type="date"
            name="title"
            value={classroomData.title}
            onChange={handleInputChange}
            className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
            placeholder='Escribe el nombre de la clase...'
          />
        </div>

        <DropdownSelect
          label="Duración (horas)"
          name='duration_hours'
          options={['1 Hora', '2 Horas', '3 Horas', '4 Horas']}
          selectedOption={classroomData.duration_hours}
          onSelect={handleInputChange}
        />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <ButtonModal buttonAction={onClose} type='prev' label='Cancelar' />
        <ButtonModal buttonAction={onSubmit} type='next' label='Crear Clase' />
      </div>
    </form>
  );
};

export default CreateClassForm;