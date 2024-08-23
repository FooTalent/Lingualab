import { useEffect, useState } from 'react';
import { getStudents, inviteStudent } from '../../../../services/students.services';
import DropdownSelect from '../../SubComponents/DropdownSelect';
import { useAppStore } from '../../../../store/useAppStore';
import Modal from '../../../../components/Modal';
import AddStudentForm from '../../../../components/AddStudentForm';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../../components/ErrorMessage';

const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const EditVCRForm = ({ program, onSubmit, onClose, teacherId, token }) => {
  const { user } = useAppStore();
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();
  const [programData, setProgramData] = useState({
    title: program.title || '',
    students: program.students.map(student => student._id) || [],
    daysOfWeek: program.daysOfWeek || [],
    first_class: program.first_class || '',
    startDate: program.first_class ? program.first_class.split('T')[0] : '',
    time: program.first_class ? program.first_class.split('T')[1].slice(0, 5) : '',
    endTime: '',
  });
  const today = new Date().toISOString().split("T")[0];
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
          newData.first_class = `${date}T${time}`;
        }
      }
      return newData;
    });
  };

  const handleStudentChange = (studentId) => {
    if (studentId && !programData.students.includes(studentId)) {
      setProgramData((prevData) => ({
        ...prevData,
        students: [...prevData.students, studentId],
      }));
      setValue("studentsId", "");
    }
  };

  const handleRemoveStudent = (studentId) => {
    setProgramData((prevData) => ({
      ...prevData,
      students: prevData.students.filter(id => id !== studentId),
    }));
  };

  const handleDayChange = (day) => {
    setProgramData((prevData) => {
      const daysOfWeek = prevData.daysOfWeek.includes(day)
        ? prevData.daysOfWeek.filter((d) => d !== day)
        : [...prevData.daysOfWeek, day];
      return { ...prevData, daysOfWeek };
    });
  };

  const handleFormSubmit = (e) => {
    onSubmit({ ...programData });
  };

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddOneMoreStudent = async (newStudent) => {
    try {
      await inviteStudent(user.token, newStudent);
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar al alumno', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-4">
          <input
            type="text"
            name="title"
            value={programData.title}
            {...register("title", {
              required: "Escriba un titulo",
              onChange: (e) => {
                handleInputChange(e);
                clearErrors("title");
              }
            })}
            className="w-1/2 p-2 border rounded-md"
          />
          {errors.title && (
            <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}
        </div>
        <div className="mb-4 w-full">
          <div className="flex items-center mb-2">
            <DropdownSelect
              setValue={setValue}
              name="studentsId"
              errors={errors}
              clearErrors={clearErrors}
              register={register("studentsId", { required: "Debe invitar al menos un alumno" })}
              label="Estudiante/s"
              options={students.map(student => ({ label: `${student.last_name}, ${student.first_name}`, value: student._id }))}
              selectedOption={'Seleccionar Estudiante'}
              onSelect={handleStudentChange}
            />
            <button
              type="button"
              onClick={handleModalOpen}
              className="self-end ml-2 bg-Yellow text-darkGray px-4 py-3 rounded-md hover:bg-darkGray hover:text-Yellow duration-150"
            >
              Invitar
            </button>
          </div>
          <div className="flex flex-col">
            {programData.students.map((studentId) => {
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
        <div className='flex flex-row w-full mb-4 gap-4'>
          <div className="flex flex-col w-1/2">
            <label className="block text-gray-700 px-0">Fecha de inicio</label>
            <input
              type="date"
              name="startDate"
              min={today}
              value={programData.startDate}
              {...register("startDate", {
                required: "La fecha de inicio es obligatoria",
                onChange: (e) => {
                  handleInputChange(e);
                  clearErrors("startDate");
                }
              })}
              className="w-full p-2 border rounded-md h-auto"
            />
            {errors.startDate && (
              <ErrorMessage>{errors.startDate.message}</ErrorMessage>
            )}
          </div>
          <div className="flex flex-col w-1/2">
            <label className="block text-gray-700 px-0">Seleccionar Día/s</label>
            <div className='flex flex-row justify-between w-full mb-1'>
              {days.map((day) => (
                <div className='relative' key={day}>
                  <input
                    type="checkbox"
                    id={day}
                    name="daysOfWeek"
                    value={day}
                    {...register("daysOfWeek", { required: "Debe seleccionar al menos un día" })}
                    onChange={() => handleDayChange(day)}
                    checked={programData.daysOfWeek.includes(day)}
                    className="hidden"
                  />
                  <label htmlFor={day}
                    className={`flex items-center justify-center w-10 h-10 border-2 rounded-full cursor-pointer font-medium text-lg ${programData.daysOfWeek.includes(day)
                      ? 'bg-Purple text-white border-black'
                      : 'bg-white text-gray-700 border-gray-300'
                      }`}>
                    {day.slice(0, 2).toUpperCase()}
                  </label>
                </div>
              ))}
            </div>
            {errors.daysOfWeek && (
              <ErrorMessage>{errors.daysOfWeek.message}</ErrorMessage>
            )}
          </div>
        </div>
        <div className='flex flex-row w-full mb-4 gap-4'>
          <div className='flex flex-col w-full'>
            <label className='px-0'>Hora de Inicio</label>
            <input
              type="time"
              name="time"
              value={programData.time}
              {...register("time", {
                required: "La hora de inicio es obligatoria",
                onChange: (e) => {
                  handleInputChange(e);
                  clearErrors("time");
                }
              })}
              className="p-2 border rounded-md"
            />
            {errors.time && (
              <ErrorMessage>{errors.time.message}</ErrorMessage>
            )}
          </div>
          <div className='flex flex-col w-full'>
            <label className='px-0'>Hora fin</label>
            <input
              type="time"
              name="endTime"
              value={programData.endTime}
              {...register("endTime", {
                required: "La hora de finalización es obligatoria",
                onChange: (e) => {
                  handleInputChange(e);
                  clearErrors("endTime");
                }
              })}
              className="p-2 border rounded-md"
            />
            {errors.endTime && (
              <ErrorMessage>{errors.endTime.message}</ErrorMessage>
            )}
          </div>

        </div>


        <div className="flex justify-between">
          <button
            type="button"
            className="w-full bg-transparent text-Purple border border-Purple px-4 py-2 rounded-md mr-2 hover:bg-Purple hover:text-white duration-150"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full bg-Purple text-white px-4 py-2 rounded-md hover:bg-PurpleHover duration-150"
          >
            Modificar Aula
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Invitar Estudiante" modalSize='medium'>
        <AddStudentForm
          onSubmit={handleAddOneMoreStudent}
        />
      </Modal>
    </>
  );
};

export default EditVCRForm;
