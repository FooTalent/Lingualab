import React, { useState } from 'react';
import { LEVELS, LEVELS_MAP } from '../utils/valueLists';

const AddStudentForm = ({ onSubmit, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [level, setLevel] = useState('A1-A2');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ first_name: firstName, last_name: lastName, email, level, birthday, phone });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input type="text" placeholder="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
      <input type="text" placeholder="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
      <select
        name="level"
        value={level}
        onChange={(value) => setLevel(value)}
        className="w-full p-2 border rounded-md"
        style={{ color: LEVELS_MAP[level] }}
      >
        {LEVELS.map((level, i) => (
          <option key={i} value={level.data} style={{ color: level.color }}>
            {level.data}
          </option>
        ))}
      </select>
      <input type="date" placeholder="Fecha de Nacimiento" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
      <input type="tel" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} className="p-2 border border-gray-300 rounded-lg" />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded-lg">Cancelar</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Agregar</button>
      </div>
    </form>
  );
};

export default AddStudentForm;
