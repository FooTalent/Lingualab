import React from 'react';

const ClassDetailList = ({ classDetailList, selectedClassDetail, setSelectedClassDetail, handleAssignClassDetail }) => {
  return (
    <div className="mb-4">
      <label htmlFor="classDetailSelect" className="block mb-2">Seleccionar una clase existente</label>
      <select
        id="classDetailSelect"
        value={selectedClassDetail}
        onChange={(e) => setSelectedClassDetail(e.target.value)}
        className="form-select w-full px-3 py-2 border border-gray-300 rounded-md"
      >
        <option value="">Seleccionar una clase existente</option>
        {classDetailList.map(detail => (
          <option key={detail._id} value={detail._id}>{detail.title}</option>
        ))}
      </select>
      <button onClick={handleAssignClassDetail} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Asignar clase</button>
    </div>
  );
};

export default ClassDetailList;
