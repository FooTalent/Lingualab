import React, { useState } from 'react';
import { LEVELS, LEVELS_MAP } from '../../../../utils/valueLists';
import DropdownSelect from '../../DropdownSelect';

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
      className='flex flex-col gap-4 text-card justify-evenly'
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

      <div className="flex flex-col gap-3 font-medium">
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

      <div className="flex flex-col gap-3 font-medium">
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

      <div className="mb-4">
        <label className="block text-gray-700">Duración (horas)</label>
        <input
          type="number"
          name="duration_hours"
          value={classroomData.duration_hours}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Crear
        </button>
      </div>
    </form>
  );
};

export default CreateClassForm;