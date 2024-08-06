import { useAppStore } from "../store/useAppStore";
import SearchIcon from "@mui/icons-material/Search";

const Home = () => {
  const { status } = useAppStore();

  if (status)
    return (
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-[#444444]">¡Bienvenido Profesor!</h1>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="¿Qué estás buscando?"
                className="border border-[#444444] rounded-md px-4 py-2 pl-10 w-[566px] h-[48px] bg-[#F9F9F9] text-[#444444] placeholder-[#444444]"
              />
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#444444]" />
            </div>
            <button className="bg-[#6945FF] text-white font-bold px-4 py-2 rounded-md w-[82px] h-[48px]">
              Buscar
            </button>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col space-y-4 flex-1">
            <div className="shadow-lg rounded-md p-4 flex items-center space-x-4 bg-white">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#444444]">¿Estás listo/a para empezar a dar clases?</h2>
                <p className="text-[#444444]">
                  Ingresa a ver más para acceder al instructivo de cómo crear tus programas, clases, y cómo agregar materiales. Encontrá recursos útiles, un recorrido completo por la página y descubre cómo gestionar a tus alumnos.
                </p>
                <button className="bg-[#444444] text-[#FFDC00] font-bold px-4 py-2 mt-2 rounded-md">
                  Ver más
                </button>
              </div>
              <img
                src="/ImagesHome/Comencemos.png"
                alt="PopupComencemos"
                className="w-48 h-auto"
              />
            </div>
            <div className="flex gap-6">
              <div className="shadow-lg rounded-md p-6 flex flex-col items-start w-[231px] h-[205px] bg-white">
                <img
                  src="/ImagesHome/TotalPrograma.png"
                  alt="Total Programa"
                  className="w-16 h-auto mb-2"
                />
                <p className="text-2xl font-bold text-[#444444]">15</p>
                <p className="text-[#444444]">Total de programas</p>
              </div>
              <div className="shadow-lg rounded-md p-6 flex flex-col items-start w-[231px] h-[205px] bg-white">
                <img
                  src="/ImagesHome/ProgramaCompleto.png"
                  alt="Programa Completo"
                  className="w-16 h-auto mb-2"
                />
                <p className="text-2xl font-bold text-[#444444]">6</p>
                <p className="text-[#444444]">Programas completos</p>
              </div>
              <div className="shadow-lg rounded-md p-6 flex flex-col items-start w-[231px] h-[205px] bg-white">
                <img
                  src="/ImagesHome/CargaHoraria.png"
                  alt="Carga Horaria"
                  className="w-16 h-auto mb-2"
                />
                <p className="text-2xl font-bold text-[#444444]">120 hrs</p>
                <p className="text-[#444444]">Total carga horaria</p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 mt-8">
              <div>
                <h3 className="text-lg font-bold text-[#444444] mb-2">Tu clase ahora</h3>
                <div className="shadow-lg rounded-md bg-white w-[357px] h-[192px] p-4">
                  <div className="flex flex-col justify-between h-full">
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#444444] mb-2">Tu próxima clase</h3>
                <div className="shadow-lg rounded-md bg-white w-[357px] h-[192px] p-4">
                  <div className="flex flex-col justify-between h-full">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 lg:w-[390px]">
            <div className="shadow-lg rounded-md p-6 bg-white w-[390px] h-[315px]">
              <img
                src="/ImagesHome/creacionvideo.PNG"
                alt="Creación Video"
                className="w-full h-auto mb-2"
              />
              <h2 className="text-xl font-bold text-[#444444] mb-2">Cómo crear tus clases</h2>
              <p className="text-[#444444]">Dale play al video para ver</p>
            </div>
            <div className="shadow-lg rounded-md p-6 bg-white w-[390px] h-[368px]">
              <h2 className="text-xl font-bold text-[#444444] mb-2">Últimas Novedades</h2>
              <p className="text-[#444444] mb-2">
                Mantente al día con las últimas actualizaciones y eventos. Descubre nuevos recursos disponibles para mejorar tus clases, tips para un mejor manejo de tus aulas virtuales, y noticias relevantes del mundo de la educación.
              </p>
              <img
                src="/ImagesHome/novedades.PNG"
                alt="Últimas Novedades"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home;







