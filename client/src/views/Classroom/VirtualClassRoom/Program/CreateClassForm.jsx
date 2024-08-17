import React, { useState } from 'react';

const CreateClassForm = ({ programData, onSubmit, onClose }) => {
  const [classroomData, setClassroomData] = useState({
    teacher: programData.teacher._id,
    language: programData.language,
    level: programData.level,
    program: programData._id
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClassroomData({
      ...classroomData,
      isTemplate: false,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(classroomData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          name="title"
          value={classroomData.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <input
          type="text"
          name="description"
          value={classroomData.description}
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