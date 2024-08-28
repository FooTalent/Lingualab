import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { getPrograms } from '../../../../services/programs.services';
import { getStudents, inviteStudent } from '../../../../services/students.services';
import DropdownSelect from '../../SubComponents/DropdownSelect';
import { useAppStore } from '../../../../store/useAppStore';
import Modal from '../../../../components/Modal';
import AddStudentForm from '../../../../components/AddStudentForm';
import ErrorMessage from '../../../../components/ErrorMessage';
import NewStudent from '/ImagesStudent/AgregasteUnAlumno.png'
import CancelIcon from '@mui/icons-material/Cancel';
import { getTimezone } from '../../../../utils/getTimezone';

const CreateVCRForm = ({ onSubmit, onClose, teacherId, token }) => {
  const { user } = useAppStore();
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors, setError } = useForm();
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
  const [modalNewStudent, setModalNewStudent] = useState(false)
  const [modalSize, setModalSize] = useState({})

  const days = [
    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
  ]

  const today = new Date().toLocaleString().split("T")[0];

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
          const timezoneOffset = getTimezone()
          console.log(timezoneOffset)
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

  const handleStudentChange = (studentId) => {
    if (!programData.studentIds.includes(studentId)) {
      setProgramData((prevData) => ({
        ...prevData,
        studentIds: [...prevData.studentIds, studentId],
      }));
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
      setValue('daysOfWeek', daysOfWeek);
      clearErrors('daysOfWeek');
      return { ...prevData, daysOfWeek };
    });
  };

  // MODAL STUDENT
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleAddOneMoreStudent = async (newStudent) => {
    try {
      const addedStudent = await inviteStudent(user.token, newStudent);

      setProgramData((prevData) => ({
        ...prevData,
        studentIds: [...prevData.studentIds, addedStudent.data._id],
      }));

      if (addedStudent.isError === false) {
        setModalNewStudent(true)
        setTimeout(() => {
          setModalNewStudent(false)
        }, 2000)
      }
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar al alumno', error);
    }
  };

  const onFormSubmit = async (data) => {
    if (programData.studentIds.length === 0) {
      setError('studentsId', {
        type: 'manual',
        message: 'Debe invitar al menos un alumno',
      });
      return;
    }
    onSubmit({ ...data, first_class: programData.startDateTime, studentIds: programData.studentIds });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col gap-y-5 lg:gap-y-4'>
        <div className="order-1 flex flex-col gap-4 lg:gap-3 font-medium mt-4">
          <label className="p-0 text-lg md:text-custom">Nombre</label>
          <input
            type="text"
            name="title"
            value={programData.title}
            {...register("title", {
              required: "Escriba un nombre",
              onChange: (e) => {
                handleInputChange(e);
                clearErrors("title");
              }
            })}
            className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
            placeholder='Escribe el nombre del aula...'
          />
          {errors.title && (
            <ErrorMessage>{errors.title.message}</ErrorMessage>
          )}
        </div>

        <div className="order-2 flex flex-col gap-4 lg:gap-3 font-medium">
          <DropdownSelect
            setValue={setValue}
            name="templateId"
            errors={errors}
            clearErrors={clearErrors}
            register={register("templateId", { required: "El programa es obligatorio" })}
            label="Programa"
            options={programs.map(program => ({ label: program.title, value: program._id }))}
            selectedOption={
              programData.templateId ?
                programs.find(program => program._id === programData.templateId).title
                : 'Seleccionar programa'
            }
            onSelect={(value) => handleSelectChange('templateId', value)}
          />
        </div>

        <div className="order-4">
          <div className='flex flex-col xl:flex-row xl:flex-wrap xl:items-end xl:gap-4'>
            <div className='flex flex-col xl:flex-row xl:items-end gap-4 w-full'>
              <DropdownSelect
                setValue={setValue}
                name="studentsId"
                errors={errors}
                clearErrors={clearErrors}
                register={register("studentsId")}
                label="Estudiante/s"
                options={students.map(student => ({ label: `${student.last_name}, ${student.first_name}`, value: student._id }))}
                selectedOption={selectedStudent ? `${selectedStudent.last_name}, ${selectedStudent.first_name}` : 'Seleccionar Estudiante'}
                onSelect={handleStudentChange}
              />
              <button
                type="button"
                onClick={handleModalOpen}
                className="w-full xl:w-fit text-xl font-extrabold text-Yellow bg-darkGray py-3 px-8 rounded-lg"
              >
                Invitar
              </button>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 mt-4 xl:mt-0">
              {programData.studentIds.map((studentId) => {
                const student = students.find((s) => s._id === studentId);
                return (
                  <div key={studentId} className="flex items-center py-3 px-4 border border-Grey rounded-lg gap-3 truncate">
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
        </div>

        <div className='order-3 lg:order-4 flex flex-col lg:flex-row gap-4 lg:gap-3 font-medium'>
          <div className="flex flex-col lg:w-1/2 gap-3">
            <label className="p-0 text-lg md:text-custom">Fecha de inicio</label>
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

        <div className='order-5 flex flex-col lg:flex-row gap-4 lg:gap-3 font-medium'>
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

        <div className="order-last grid grid-cols-2 gap-8">
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
            Crear Aula
          </button>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Invitar Estudiante" modalSize={modalSize.add}>
        <AddStudentForm
          onSubmit={handleAddOneMoreStudent}
          onClose={handleModalClose}
        />
      </Modal>

      <Modal isOpen={modalNewStudent} modalSize={modalSize.created}>
        <div className="flex justify-center">
          <img src={NewStudent} alt="Agregaste un alumno" />
        </div>
      </Modal>
    </>
  );
};

export default CreateVCRForm;