import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getStudents } from '../../services/students.services';
import { crearURLCompleta } from '../../utils/urifoto';

const ViewStudent = () => {
  const { user, userDetail } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [students, setStudents] = useState([]);
  const [showInfo, setShowInfo] = useState(true);

  useEffect(() => {
    if (user && user.token) {
      const fetchStudents = async () => {
        try {
          setLoading(true);
          const response = await getStudents(user.token, userDetail._id);
          setStudents(response.data);
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

  console.log(students)

  return (
    <div className="mx-auto w-[1210px]">
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
          {!showInfo && (
            <button className="ml-2 bg-black text-white px-4 py-2 rounded-lg flex items-center">
              <EditIcon className="mr-2" />
              Editar
            </button>
          )}
        </div>
        <div className="flex items-center">
          <div className="relative w-96">
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

      <table className="min-w-[1210px] bg-white border gap-4 rounded-xl border-Purple">
        <thead className='border rounded-xl border-Purple gap-6'>
          <tr className='flex justify-between w-full py-6 px-4'>
            {showInfo ? (
              <>
                <th className="">Nombre y Apellido</th>
                <th className="">Programa</th>
                <th className="">Nivel</th>
                <th className="">Carga Horaria</th>
                <th className="">Teléfono</th>
                <th className="">Email</th>
              </>
            ) : (
              <>
                <th className="px-4 py-2 border-b rounded-tl-lg">Nombre y Apellido</th>
                <th className="px-4 py-2 border-b">Nivel</th>
                <th className="px-4 py-2 border-b">Oral</th>
                <th className="px-4 py-2 border-b">Escrito</th>
                <th className="px-4 py-2 border-b">Lectura</th>
                <th className="px-4 py-2 border-b rounded-tr-lg">Info.</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
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
                key={student.id}
                className={`border-b ${index === 0 ? 'rounded-t-lg' : ''
                  } ${index === students.length - 1 ? 'rounded-b-lg' : ''
                  }`}
              >
                {showInfo ? (
                  <>
                    <td className='px-4 py-2 flex items-center gap-[16px] w-[250px]'>
                      {student.photo ? (
                        <img className='w-[50px] h-[50px] rounded-full' src={crearURLCompleta(student.photo)} />
                      ) : (
                        <span className='flex justify-center items-center font-bold w-[50px] h-[50px] rounded-full bg-Yellow uppercase'>{student?.first_name?.charAt(0) + student?.last_name?.charAt(0)}</span>
                      )}
                      <span>{student.first_name} {student.last_name}</span>
                    </td>
                    <td className="px-4 py-2">{student.program}</td>
                    <td className="px-4 py-2">{student.level}</td>
                    <td className="px-4 py-2">{student.workload}</td>
                    <td className="px-4 py-2">{student.phone}</td>
                    <td className="px-4 py-2">{student.email}</td>
                  </>
                ) : (
                  <>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.level}</td>
                    <td className="px-4 py-2">{student.oral}</td>
                    <td className="px-4 py-2">{student.written}</td>
                    <td className="px-4 py-2">{student.reading}</td>
                    <td className="px-4 py-2">
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
                        Ver más
                      </button>
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







