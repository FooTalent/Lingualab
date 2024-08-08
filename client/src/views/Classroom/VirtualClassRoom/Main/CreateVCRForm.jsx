import { useEffect, useState } from 'react';
import { getPrograms } from '../../../../services/programs.services';
import { getStudents, inviteStudent } from '../../../../services/students.services';
import DropdownSelect from '../../SubComponents/DropdownSelect';
import { useAppStore } from '../../../../store/useAppStore';
import Modal from '../../../../components/Modal';
import AddStudentForm from '../../../../components/AddStudentForm';

const CreateVCRForm = ({ onSubmit, onClose, teacherId, token }) => {
  const { user } = useAppStore();
  const [programData, setProgramData] = useState({
    studentIds: [],
    daysOfWeek: [],
    startDateTime: '',
  });
  const [refresh, setRefresh] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const days = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPrograms = await getPrograms(token, teacherId);
        setPrograms(fetchedPrograms.data);
        const fetchedStudents = await getStudents(token, teacherId);
        setStudents(fetchedStudents.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token, teacherId, refresh]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramData((prevData) => {
      const newData = { ...prevData, [name]: value };

      if (name === 'startDate' || name === 'time') {
        const date = newData.startDate || prevData.startDate;
        const time = newData.time || prevData.time;
        if (date && time) {
          newData.startDateTime = `${date}T${time}`;
        }
      }
      return newData;
    });
  };

  const handleSelectChange = (field, value) => {
    setProgramData({
      ...programData,
      [field]: value,
    });
  };

  const handleStudentChange = (value) => {
    setSelectedStudent(value);
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

  const handleDayChange = (day) => {
    setProgramData((prevData) => {
      const daysOfWeek = prevData.daysOfWeek.includes(day)
        ? prevData.daysOfWeek.filter((d) => d !== day)
        : [...prevData.daysOfWeek, day];
      return { ...prevData, daysOfWeek };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(programData)
    onSubmit({ ...programData, startDateTime: programData.startDateTime });
  };

  // MODAL STUDENT
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleAddOneMoreStudent = async (newStudent) => {
    try {
      const addedStudent = await inviteStudent(user.token, newStudent);
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar al alumno', error);
    }
    console.log(newStudent);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <DropdownSelect
            label="Template"
            options={programs.map(program => ({ label: program.title, value: program._id }))}
            selectedOption={programData.templateId || 'Seleccionar Template'}
            onSelect={(value) => handleSelectChange('templateId', value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estudiantes</label>
          <div className="flex items-center mb-2">
            <DropdownSelect
              label="Estudiante"
              options={students.map(student => ({ label: `${student.last_name}, ${student.first_name}`, value: student._id }))}
              selectedOption={selectedStudent || 'Seleccionar Estudiante'}
              onSelect={handleStudentChange}
            />
            <button
              type="button"
              onClick={handleAddStudent}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              +
            </button>
            <button
              type="button"
              onClick={handleModalOpen}
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Invitar
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
          <div className='flex gap-10'>
            <input
              type="date"
              name="startDate"
              value={programData.startDate}
              onChange={handleInputChange}
              className="w-1/2 p-2 border rounded-md"
            />
            <input
              type="time"
              name="time"
              value={programData.time}
              onChange={handleInputChange}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Seleccione el dia</label>
          <div className='flex flex-row gap-5'>
            {days.map((day) => (
              <div className='relative' key={day}>
                <input
                  type="checkbox"
                  id={day}
                  name="daysOfWeek"
                  value={day}
                  onChange={() => handleDayChange(day)}
                  checked={programData.daysOfWeek.includes(day)}
                  className="hidden"
                />
                <label htmlFor={day}
                  className={`flex items-center justify-center w-10 h-10 border-2 rounded-full cursor-pointer font-medium ${programData.daysOfWeek.includes(day)
                    ? 'bg-Purple text-white border-black'
                    : 'bg-white text-gray-700 border-gray-300'
                    }`}>
                  {day.charAt(0)}
                </label>
              </div>
            ))}
          </div>
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
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Agregar Alumno" modalSize='medium'>
        <AddStudentForm
          onSubmit={handleAddOneMoreStudent}
          onClose={handleModalClose}
        />
      </Modal>
    </>
  );
};

export default CreateVCRForm;
