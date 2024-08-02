//vista alumnos
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { getStudents } from '../../services/students.services';


const ViewStudent = () => {
  const { user, userDetail } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (user && user.token) {
      const getStudent = async () => {
        try {
          setLoading(true);
          const response = await getStudents(user.token,userDetail._id);
          setStudent(response);
        } catch (error) {
          console.error('Error fetching program', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      getStudent();
    } else {
      setLoading(false);
    }
  }, [user,userDetail ]);

  console.log(student);
    return (
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="¿Qué estás buscando?"
              className="p-2 w-64"
            />
            <SearchIcon className="text-gray-500 m-2" />
          </div>
          <button className="ml-2 bg-purple-600 text-white px-4 py-2 rounded-lg">
            Buscar
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
            Información Personal
          </button>
          <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg">
            Calificaciones
          </button>
        </div>
      </div>
    );
  };
  
  export default ViewStudent;