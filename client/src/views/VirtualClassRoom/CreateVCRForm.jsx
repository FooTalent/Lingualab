import React, { useEffect, useState } from 'react';
import { getPrograms } from '../../services/programs.services';
import { getStudents } from '../../services/students.services';
import DropdownSelect from './DropdownSelect';

const CreateVCRForm = ({ onSubmit, onClose, techerId, token }) => {
  const [programData, setProgramData] = useState({
    studentIds: [],
  });
  const [programs, setPrograms] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('Seleccionar el idioma');
  const [selectedLevel, setSelectedLevel] = useState('Seleccionar el nivel')

  const languages = [
    'Inglés',
    'Español',
    'Francés',
    'Alemán',
    'Italiano',
    'Chino (Mandarín)',
  ];

  const levels = [
    'A1-A2',
    'B1-B2',
    'C1-C2'
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPrograms = await getPrograms(token, techerId);
        setPrograms(fetchedPrograms.data);
        const fetchedStudents = await getStudents(token, techerId);
        setStudents(fetchedStudents.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token, techerId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramData({
      ...programData,
      [name]: value,
    });
  };

  const handleStudentChange = (e) => {
    setSelectedStudent(e.target.value);
  };

  const handleAddStudent = () => {
    if (selectedStudent && !programData.studentIds.includes(selectedStudent)) {
      setProgramData({
        ...programData,
        studentIds: [...programData.studentIds, selectedStudent],
      });
      setSelectedStudent('');
    }
  };

  const handleRemoveStudent = (studentId) => {
    setProgramData({
      ...programData,
      studentIds: programData.studentIds.filter(id => id !== studentId),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(programData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col gap-4'
    >
      <div className='flex flex-wrap gap-3'>
        <label
          className="text-xl p-0"
          htmlFor='title'
        >
          Titulo
        </label>

        <input
          type="text"
          name="title"
          className='py-3 px-4 outline-none focus:border-black'
          placeholder='Escribe el nombre del programa...'
        />
      </div>

      <DropdownSelect
        label="Idioma"
        options={languages}
        selectedOption={selectedLanguage}
        onSelect={setSelectedLanguage}
      />

      <DropdownSelect
        label="Nivel"
        options={levels}
        selectedOption={selectedLevel}
        onSelect={setSelectedLevel}
      />

      <div className='flex flex-wrap gap-3'>
        <label
          className="text-xl p-0"
          htmlFor='description'
        >
          Descripción
        </label>

        <input
          type="text"
          name="description"
          className='py-3 px-4 outline-none focus:border-black'
          placeholder='Escribe el nombre del programa...'
        />
      </div>


      <div className="grid grid-cols-2 gap-8">
        <button
          type="button"
          className="border border-Purple bg-white hover:bg-Purple text-Purple hover:text-white font-extrabold py-3 px-8 rounded-lg mr-2 ease-linear duration-150"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="border border-Purple bg-Purple hover:bg-PurpleHover text-white font-extrabold py-3 px-8 rounded-lg ease-linear duration-150"
        >
          Crear programa
        </button>
      </div>
    </form>
  );
};

export default CreateVCRForm;