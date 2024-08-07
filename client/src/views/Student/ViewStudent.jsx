import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getReviews, getStudents } from '../../services/students.services';
import { crearURLCompleta } from '../../utils/urifoto';
import { Link } from 'react-router-dom';

const ViewStudent = () => {
  const { user, userDetail } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [score, setScore] = useState([])
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (user && user.token) {
      const fetchStudents = async () => {
        try {
          setLoading(true);
          const response = await getStudents(user.token);
          setStudents(response.data);
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
  }, [user, userDetail]);

  const handleShowInfo = () => setShowInfo(true);
  const handleShowGrades = () => setShowInfo(false);

  console.log(score)

  return (
    <div className="mx-auto py-4 w-[1210px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-2">
          <button
            onClick={handleShowInfo}
            className={`px-4 py-2 rounded-lg ${showInfo
              ? 'bg-yellow-400 text-black font-bold'
              : 'border border-yellow-400 text-black bg-yellow-100'
              }`}
          >
            Información Personal
          </button>
          <button
            onClick={handleShowGrades}
            className={`px-4 py-2 rounded-lg ${!showInfo
              ? 'bg-yellow-400 text-black font-bold'
              : 'border border-yellow-400 text-black bg-yellow-100'
              }`}
          >
            Calificaciones
          </button>
        </div>
        <div className="flex items-center w-[664px]">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="p-2 pl-10 w-full border border-gray-300 rounded-lg"
            />
            <SearchIcon className="absolute left-2 top-2 text-gray-500" />
          </div>
          <button className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
            Buscar
          </button>
        </div>
      </div>

      <table className="flex flex-col w-full bg-white gap-4 mx-auto">
        <thead className='border rounded-xl border-Purple mx-auto w-full gap-6'>
          <tr className='flex justify-between w-full py-6 px-4'>
            {showInfo ? (
              <>
                <th className='w-[250px]'>Nombre y Apellido</th>
                <th className='w-[120px]'>Nivel</th>
                <th className='w-[160px]'>Teléfono</th>
                <th className='w-[300px]'>Email</th>
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
        <tbody className='border rounded-xl border-Purple mx-auto w-full gap-6 px-4'>
          {loading ? (
            <tr>
              <td colSpan="6" className="text-center py-4">Cargando...</td>
            </tr>
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
                className={`border-b ${index === 0 ? 'rounded-t-xl' : ''
                  } ${index === students.length - 1 ? 'border-none' : ''
                  } flex justify-between items-center w-full py-6 border-Purple gap-6`}
              >
                {showInfo ? (
                  <>
                    <td className='w-[250px] gap-6'>
                      {student.photo ? (
                        <img className='w-fit-[50px] h-fit-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                      ) : (
                        <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                      )}
                      <span className='w-[184px]'>{student.first_name} {student.last_name}</span>
                    </td>
                    <td className='w-[120px]'>{student.level}</td>
                    <td className='w-[160px]'>{student.phone}</td>
                    <td className='w-[300px]'>{student.email}</td>
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
                        className="bg-Purple font-extrabold text-[16px] text-white p-3 rounded-lg">
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
  );
};

export default ViewStudent;







