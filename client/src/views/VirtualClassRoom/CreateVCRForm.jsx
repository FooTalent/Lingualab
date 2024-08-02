import React, { useEffect, useState } from 'react';
import { getPrograms } from '../../services/programs.services';
import { getStudents } from '../../services/students.services';

const CreateVCRForm = ({ onSubmit, onClose, techerId, token }) => {
  const [programData, setProgramData] = useState({
    studentIds: [],
  });
  const [programs, setPrograms] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');

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
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700">Template</label>
        <select
          name="templateId"
          value={programData.templateId}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Seleccionar Template</option>
          {programs.map((program) => (
            <option key={program._id} value={program._id}>
              {program.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Estudiantes</label>
        <div className="flex items-center mb-2">
          <select
            value={selectedStudent}
            onChange={handleStudentChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Seleccionar Estudiante</option>
            {students.map((student) => (
              <option key={student._id} value={student._id}>
              {student.last_name}, {student.first_name}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAddStudent}
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            +
          </button>
        </div>
        <div className="flex flex-col">
          {programData.studentIds.map((studentId) => {
            const student = students.find((s) => s._id === studentId);
            return (
              <div key={studentId} className="flex items-center m-1 p-2 border rounded-md bg-gray-200">
                <span>{student ? `${student.last_name}, ${student.first_name}` : 'Estudiante desconocido'}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveStudent(studentId)}
                  className="ml-2 text-red-500"
                >
                  x
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Fecha de inicio</label>
        <input
          type="date"
          name="startDate"
          value={programData.startDate}
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

export default CreateVCRForm;