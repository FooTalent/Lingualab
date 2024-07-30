//vista alumnos
import SearchIcon from '@mui/icons-material/Search';

const ViewStudent = () => {
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