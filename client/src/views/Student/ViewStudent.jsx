import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getReviews, getStudents, inviteStudent } from '../../services/students.services';
import { crearURLCompleta } from '../../utils/urifoto';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import AddStudentForm from '../../components/AddStudentForm';
import { format } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';
import { removeAccents } from '../../utils/removeAccents';
import NewStudent from "/ImagesStudent/AgregasteUnAlumno.png"
import Spinner from "../../components/Spinner/Spinner"

const ViewStudent = () => {
  const { user, userDetail } = useAppStore();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([])
  const [score, setScore] = useState([])
  const [showInfo, setShowInfo] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef(null)
  const [modalNewStudent, setModalNewStudent] = useState(false)
  const [modalSize, setModalSize] = useState({});

  useEffect(() => {
    const handleResize = () => {
      let size = {};

      if (window.innerWidth >= 1024) {
        size = {add: 'small', created: 'xsmall'};
      } else if (window.innerWidth >= 768) {
        size = {add: 'medium', created: 'small'};
      } else {
        size = {add: 'full', created: 'full'};
      }

      setModalSize(size);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (user && user.token) {
      const fetchStudents = async () => {
        try {
          setLoading(true);
          const response = await getStudents(user.token);
          setStudents(response.data);
          setAllStudents(response.data)

          const filter = { eid: userDetail._id }
          const res = await getReviews(user.token, filter)
          setScore(res.data)
        } catch (error) {
          console.error('Error fetching students', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchStudents();
    } else {
      setLoading(false);
    }
  }, [user, userDetail, refresh]);

  const handleShowInfo = () => setShowInfo(true);
  const handleShowGrades = () => setShowInfo(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const handleAddStudent = async (newStudent) => {
    try {
      const addedStudent = await inviteStudent(user.token, newStudent);
      if (addedStudent.isError === false) {
        setModalNewStudent(true)
        setTimeout(() => {
          setModalNewStudent(false)
        }, 2000)
      }
      setRefresh(!refresh);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al agregar estudiante', error);
      setError(error.message);
    }
  };

  const handleBirthday = (date) => {
    const parsedDate = new Date(date);
    const formattedDate = format(parsedDate, 'dd/MM/yyyy');
    return formattedDate;
  }

  const handleSearchStudents = () => {
    const searched = inputRef.current.value.trim().toLowerCase()
    const normalizedSearched = removeAccents(searched)

    if (!searched) {
      setRefresh(!refresh)
    }
    const filteredStudents = allStudents.filter(student => {
      const normalizedFullName = removeAccents(`${student.first_name} ${student.last_name}`).toLowerCase()

      return normalizedFullName.includes(normalizedSearched) || student.email.includes(normalizedSearched)
    })
    setStudents(filteredStudents)
  }

  return (
    <div className="container mx-auto py-4 flex flex-col gap-14 text-card">
      <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
        <div className="grid grid-cols-2 lg:flex gap-6 order-2 lg:order-1">
          <button
            onClick={handleShowInfo}
            className={`lg:w-[200px] border-2 px-1 lg:px-4 py-3 rounded-lg leading-5 tracking-wide truncate ease-out duration-600 hover:bg-Yellow hover:font-extrabold 
              border-Yellow bg-Yellow font-extrabold
              `}
          // ${showInfo
          //   ? 'border-Yellow bg-Yellow font-extrabold'
          //   : 'border-Yellow text-black bg-YellowDeselect'
          // }
          >
            Información Personal
          </button>
          <button
            // onClick={handleShowGrades}
            className={`lg:w-[144px] border-2 px-1 lg:px-4 py-3 rounded-lg leading-5 tracking-wide truncate
              opacity-50 !cursor-not-allowed border-card bg-card bg-opacity-50 text-black`}
          // ${!showInfo
          //   ? 'border-Yellow bg-Yellow font-extrabold'
          //   : 'border-Yellow text-black bg-YellowDeselect'
          // }
          >
            Calificaciones
          </button>
        </div>

        <div className="flex items-center gap-4 order-1 w-full md:w-3/4 xl:w-full">
          <div className="relative w-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="¿Qué estas buscando?"
              className="border border-Grey rounded-lg px-4 py-3 pl-11 h-[48px] bg-inputBg text-card placeholder:text-Grey outline-none focus:border-Purple hover:border-Purple truncate"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#444444]" />
          </div>

          <button
            onClick={handleSearchStudents}
            className="bg-Purple tracking-wide hover:bg-PurpleHover text-white font-extrabold px-4 py-3 rounded-lg h-[48px] ease-out duration-600">
            Buscar
          </button>
        </div>
      </div>

      <div className="relative overflow-x-auto scrollbar bg-transparent">
        <table className="min-w-full table-fixed bg-white space-y-4">
          <thead className='w-full py-6 shadow-customTable flex items-center gap-6 border border-Purple rounded-xl'>
            <tr className='flex justify-between w-full px-4 text-tableHead text-lg leading-5'>
              {showInfo ? (
                <>
                  <th className='min-w-[250px] xl:min-w-fit xl:max-w-[250px]'>Nombre y Apellido</th>
                  <th className='min-w-[250px] xl:min-w-fit xl:max-w-[120px]'>Nivel</th>
                  <th className='min-w-[250px] xl:min-w-fit xl:max-w-[160px]'>Teléfono</th>
                  <th className='min-w-[250px] xl:min-w-fit xl:max-w-[168px] whitespace-nowrap'>Fecha de Nacimiento</th>
                  <th className='min-w-[250px] xl:min-w-fit xl:max-w-[300px]'>Email</th>
                </>
              ) : (
                <>
                  <th className='w-[250px]'>Nombre y Apellido</th>
                  <th className='w-[160px]'>Nivel</th>
                  <th className='w-[160px]'>Oral</th>
                  <th className='w-[160px]'>Escrito</th>
                  <th className='w-[160px]'>Lectura</th>
                  <th className='w-[90px]'>Info.</th>
                </>
              )}
            </tr>
          </thead>

          <tbody className='border border-Purple rounded-xl shadow-customTable p-4 flex flex-col items-center'>
            {loading ? (
              <Spinner />
            ) : error ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-red-500">
                  Error: {error}
                </td>
              </tr>
            ) : students.length > 0 ? (
              students.map((student, index) => (
                <tr
                  key={student._id}
                  className={`border-b text-tableHead ${index === 0 ? 'pt-0' : ''
                    } ${index === students.length - 1 ? 'border-none pb-0' : ''
                    } flex justify-between items-center w-full py-6 border-Purple xl:gap-6`}
                >
                  {showInfo ? (
                    <>
                      <td className='min-w-[250px] xl:min-w-fit xl:w-[250px] gap-4 items-center'>
                        {student.photo ? (
                          <img className='w-fit-[50px] h-fit-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                        ) : (
                          <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                        )}
                        <span className='w-[184px]'>{student.first_name} {student.last_name}</span>
                      </td>
                      <td className='min-w-[250px] xl:min-w-fit xl:w-[120px]'>{student.level}</td>
                      <td className='min-w-[250px] xl:min-w-fit xl:w-[160px]'>{student.phone}</td>
                      <td className='min-w-[250px] xl:min-w-fit xl:max-w-[168px] whitespace-nowrap'>{handleBirthday(student.birthday)}</td>
                      <td className='min-w-[250px] xl:min-w-fit xl:w-[300px]'>{student.email}</td>
                    </>
                  ) : (
                    <>
                      <td className='w-[250px] gap-6'>
                        {student.photo ? (
                          <img className='w-fit-[50px] h-fit-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                        ) : (
                          <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                        )}
                        <span className='w-[184px]'>{student.first_name} {student.last_name}</span>
                      </td>
                      <td className='w-[160px]'>{student.level}</td>
                      <td className='w-[160px]'>{student.oral}</td>
                      <td className='w-[160px]'>{student.written}</td>
                      <td className='w-[160px]'>{student.reading}</td>
                      <td className='w-[90px]'>
                        <Link
                          to={`/student/${student._id}`}
                          className="bg-Purple hover:bg-PurpleHover whitespace-nowrap font-extrabold text-base text-white py-3 px-4 rounded-lg ease-out duration-600">
                          Ver más
                        </Link>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No se encontraron estudiantes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button
          onClick={handleModalOpen}
          className="bg-Yellow hover:bg-card hover:text-Yellow font-extrabold tracking-wide flex gap-[10px] px-6 py-4 w-[370px] justify-center items-center rounded-lg text-xl leading-7 ease-out duration-600"
        >
          <span>Agregar estudiante</span>
          <AddIcon />
        </button>
      </div>

      {
        modalSize && (
          <Modal isOpen={isModalOpen} onClose={handleModalClose} title="Agregar Estudiante" modalSize={modalSize.add}>
            <AddStudentForm
              onSubmit={handleAddStudent}
              onClose={handleModalClose}
            />
          </Modal>
        )
      }


      <Modal isOpen={modalNewStudent} modalSize={modalSize.created}>
        <div className="flex justify-center">
          <img src={NewStudent} alt="Agregaste un estudiante" />
        </div>
      </Modal>
    </div>
  );
};

export default ViewStudent;
