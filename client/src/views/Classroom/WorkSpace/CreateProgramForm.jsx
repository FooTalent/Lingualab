import React, { useState } from 'react';
import { LANGUAGES, LEVELS } from '../../../utils/valueLists';
import DropdownSelect from '../DropdownSelect';

const CreateProgramForm = ({ onSubmit, onClose }) => {
  const [programData, setProgramData] = useState({
    title: '',
    description: '',
    language: LANGUAGES[0],
    level: LEVELS[0].data,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramData({
      ...programData,
      [name]: value,
    });
  };

  const handleSelectChange = (field, value) => {
    setProgramData({
      ...programData,
      [field]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(programData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          name="title"
          value={programData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <input
          type="text"
          name="description"
          value={programData.description}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <DropdownSelect
          label="Idioma"
          options={LANGUAGES}
          selectedOption={programData.language}
          onSelect={(value) => handleSelectChange('language', value)}
        />
      </div>
      <div className="mb-4">
        <DropdownSelect
          label="Nivel"
          options={LEVELS.map(level => level.data)}
          selectedOption={programData.level}
          onSelect={(value) => handleSelectChange('level', value)}
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

export default CreateProgramForm;