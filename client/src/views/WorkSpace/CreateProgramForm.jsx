import React, { useState } from 'react';
import { LANGUAGES, LEVELS, LEVELS_MAP } from '../../utils/valueLists';

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
        <label className="block text-gray-700">Idioma</label>
        <select
          name="language"
          value={programData.language}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        >
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Nivel</label>
        <select
          name="level"
          value={programData.level}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
          style={{ color: LEVELS_MAP[programData.level] }}
        >
          {LEVELS.map((level) => (
            <option key={level.key} value={level.data} style={{ color: level.color }}>
              {level.data}
            </option>
          ))}
        </select>
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