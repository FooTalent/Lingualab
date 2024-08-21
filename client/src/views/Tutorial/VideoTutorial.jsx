import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const VideoTutorial = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <div className="relative p-6">
      <button
        onClick={handleButtonClick}
        className="absolute top-4 left-4 flex items-center w-28 h-12 bg-transparent text-gray-700 border border-gray-700 rounded-md text-xl p-1"
      >
          <ArrowBackIcon className="mr-2" />
          Volver
      </button>
      <div className="mt-16">
        <h1 className="text-left text-2xl font-bold text-[#444444] mb-10">
          ¿Comenzamos con el tutorial?
        </h1>
        <h2 className="text-left text-xl font-bold mt-2 text-[#444444]">
          ¡Aprendé a navegar en LinguaLab!
        </h2>
        <p className="text-left mt-4 text-[#444444]">
          Este tutorial te irá guiando para que puedas crear tus programas, clases y materiales. Encontrás recursos útiles, un recorrido completo por la página y descubre cómo gestionar a tus estudiantes.
        </p>
      </div>
    </div>
  );
};

export default VideoTutorial;
