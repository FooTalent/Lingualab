import React from 'react';

const CreateClassDetailForm = ({ newClassDetail, setNewClassDetail, handleCreateClassDetail }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Crear nueva clase</h3>
      <input
        type="text"
        placeholder="Título"
        value={newClassDetail.title}
        onChange={(e) => setNewClassDetail({ ...newClassDetail, title: e.target.value })}
        className="form-input w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
      />
      <input
        type="text"
        placeholder="Nivel"
        value={newClassDetail.level}
        onChange={(e) => setNewClassDetail({ ...newClassDetail, level: e.target.value })}
        className="form-input w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
        disabled
      />
      <input
        type="text"
        placeholder="Idioma"
        value={newClassDetail.language}
        onChange={(e) => setNewClassDetail({ ...newClassDetail, language: e.target.value })}
        className="form-input w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
        disabled
      />
      <textarea
        placeholder="Descripción"
        value={newClassDetail.description}
        onChange={(e) => setNewClassDetail({ ...newClassDetail, description: e.target.value })}
        className="form-textarea w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
      />
      <input
        type="number"
        placeholder="Duración (horas)"
        value={newClassDetail.duration_hours}
        onChange={(e) => setNewClassDetail({ ...newClassDetail, duration_hours: e.target.value })}
        className="form-input w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
      />
      <button onClick={handleCreateClassDetail} className="bg-green-500 text-white px-4 py-2 rounded-md mt-2">Crear clase</button>
    </div>
  );
};

export default CreateClassDetailForm;
