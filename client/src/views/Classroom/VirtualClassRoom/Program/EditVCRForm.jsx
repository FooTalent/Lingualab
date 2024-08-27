import { useEffect, useState } from 'react';
import { getStudents, inviteStudent } from '../../../../services/students.services';
import DropdownSelect from '../../SubComponents/DropdownSelect';
import { useAppStore } from '../../../../store/useAppStore';
import Modal from '../../../../components/Modal';
import AddStudentForm from '../../../../components/AddStudentForm';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../../components/ErrorMessage';
import CancelIcon from '@mui/icons-material/Cancel';

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
    time: '',
    endTime: '',
  });

  const today = new Date().toISOString().split("T")[0];
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalSize, setModalSize] = useState({})

  useEffect(() => {
    if (program.first_class) {
      const firstClass = new Date(program.first_class);
      const formattedHours = firstClass.getHours().toString().padStart(2, '0');
      const formattedEndHours = (firstClass.getHours() + program.duration_hours).toString().padStart(2, '0');
      const formattedMinutes = firstClass.getMinutes().toString().padStart(2, '0');

      setProgramData((prevData) => ({
        ...prevData,
        time: `${formattedHours}:${formattedMinutes}`,
        endTime: `${formattedEndHours}:${formattedMinutes}`,
      }));
    }
  }, [program.first_class, program.duration_hours]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getStudents(token, teacherId);
        setStudents(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [token, teacherId, refresh]);

  useEffect(() => {
    setValue("studentsId", programData.students);
    setValue("time", programData.time);
    setValue("endTime", programData.endTime);
  }, [setValue, programData]);

  useEffect(() => {
    const handleResize = () => {
      let size = {};

      if (window.innerWidth >= 1024) {
        size = { add: 'small', created: 'xsmall' };
      } else if (window.innerWidth >= 768) {
        size = { add: 'medium', created: 'small' };
      } else {
        size = { add: 'full', created: 'medium' };
      }

      setModalSize(size);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      <form onSubmit={handleSubmit(handleFormSubmit)} className='flex flex-col gap-y-5 lg:gap-y-4'>
        <div className="flex flex-col gap-4 lg:gap-3 font-medium mt-4">
          <label className="p-0 text-lg md:text-custom">Nombre</label>
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
            className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          />
          {errors.title && (
            <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}
        </div>

        <div className=" flex flex-col gap-4 lg:gap-3 font-medium">
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
            className="order-3 w-full lg:w-fit text-xl font-extrabold text-Yellow bg-darkGray py-3 px-8 rounded-lg"
          >
            Invitar
          </button>

          <div className="order-2 grid grid-cols-2 gap-4 lg:flex flex-col">
            {programData.students.map((studentId) => {
              const student = students.find((s) => s._id === studentId);
              return (
                <div key={studentId} className="flex items-center py-3 px-4 border border-Grey hover:bg-Grey hover:text-white ease-out duration-300 rounded-lg gap-3 truncate">
                  <button
                    type="button"
                    onClick={() => handleRemoveStudent(studentId)}
                  >
                    <CancelIcon />
                  </button>
                  <span className='max-w-[90%] truncate'>{student ? `${student.last_name}, ${student.first_name}` : 'Estudiante desconocido'}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-4 lg:gap-3 font-medium'>
          <div className="flex flex-col lg:w-1/2 gap-3">
            <label className="p-0 text-lg md:text-custom">Fecha de inicio</label>
            <input
              type="date"
              name="startDate"
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

          <div className="flex flex-col lg:w-1/2 gap-3">
            <label className="p-0 text-lg md:text-custom">Seleccionar Día/s</label>
            <div className='flex flex-row justify-between w-full'>
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

        <div className='flex flex-col lg:flex-row gap-4 lg:gap-3 font-medium'>
          <div className='flex flex-col lg:w-1/2 gap-3'>
            <label className='p-0 text-lg md:text-custom'>Hora de Inicio</label>
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

          <div className='flex flex-col lg:w-1/2 gap-3'>
            <label className='p-0 text-lg md:text-custom'>Hora fin</label>
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

        <div className="grid grid-cols-2 gap-8">
          <button
            type="button"
            className="w-full bg-transparent text-Purple font-extrabold tracking-wide leading-6 border border-Purple px-4 py-2 rounded-md hover:bg-Purple hover:text-white ease-out duration-150"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="w-full bg-Purple text-white font-extrabold tracking-wide leading-6 px-4 py-2 rounded-md hover:bg-PurpleHover ease-out duration-150"
          >
            Guardar edición
          </button>
        </div>
      </form>

      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Invitar Estudiante" modalSize={modalSize.add}>
        <AddStudentForm
          onSubmit={handleAddOneMoreStudent}
        />
      </Modal>
    </>
  );
};

export default EditVCRForm;
