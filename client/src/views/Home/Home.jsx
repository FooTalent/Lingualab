import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import SearchIcon from "@mui/icons-material/Search";
import { getCountPrograms, getHourlyLoad, getNextNClassesByTeacher } from "../../services/programs.services";
import DisplayNextClasses from "./DisplayNextClasses";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, status, userDetail } = useAppStore();
  const navigate = useNavigate();

  const [classes, setClasses] = useState([]);
  const [countPrograms, setCountPrograms] = useState(0);
  const [countClassRooms, setCountClassRooms] = useState(0);
  const [hourlyLoad, setHourlyLoad] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user && user.token && userDetail?._id) {
      const fetchClasses = async () => {
        try {
          setLoading(true);
          const response = await getNextNClassesByTeacher(user.token, 2);
          if (response.isError) { throw new Error(response.message); }
          
          setClasses(response.data);
          const cprograms = await getCountPrograms(user.token, userDetail._id, true )
          setCountPrograms(cprograms.data  || 0);
          const cclassrroms = await getCountPrograms(user.token, userDetail._id, false )
          setCountClassRooms(cclassrroms.data  || 0);
          const chourlyLoad = await getHourlyLoad(user.token )
          setHourlyLoad(chourlyLoad.data  || 0);

        } catch (error) {
          console.error("Error al cargar los Programas", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchClasses();
    } else {
      setLoading(false);
    }
  }, [user, userDetail, refresh]);

  const handleRefresh = () => {
    setRefresh(prevRefresh => !prevRefresh)
  }

  const handleEditContentClass = (classId) => {
    navigate(`/aulavirtual/clase/${classId}`);
  };

  if (status)
    return (
      <div className="flex flex-col gap-8 lg:gap-12 text-card pt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-home leading-9 font-semibold">
            ¡Te damos la bienvenida!
          </h1>
        </div>

        <div className="flex flex-col xl:flex-row gap-y-8 xl:gap-x-4 2xl:gap-20 flex-grow">
          <div className="flex flex-col justify-between gap-7 w-full">
            <div className="order-2 lg:order-1 shadow-home rounded-xl p-4 lg:py-6 lg:px-8 flex flex-col md:flex-row items-center gap-6 h-auto">
              <div className="flex items-center justify-center lg:w-[300px] h-[194px] bg-[#FFDC00] rounded-lg">
                <img
                  src="/ImagesHome/Popup_Comencemos.png"
                  alt="PopupComencemos"
                />
              </div>

              <div className="flex flex-col justify-between w-full lg:w-[372px] h-[194px]">
                <h2 className="text-xl font-medium">
                  ¡Empecemos a dar clases!
                </h2>
                <div className="flex">
                  <p className="text-[16px] font-normal leading-[18.75px]">
                    Ingresa a ver más para acceder al instructivo de cómo crear
                    tus programas, clases, y cómo agregar materiales. Encontrá
                    recursos útiles, un recorrido completo por la página y
                    descubre cómo gestionar a tus alumnos.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/videotutorial")}
                  className="bg-card hover:bg-Yellow text-Yellow tracking-wide hover:text-card font-extrabold px-4 py-[10px] text-[16px] rounded-lg self-start ease-out duration-600"
                >
                  Tutorial
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex w-full justify-between md:justify-center lg:justify-between lg:gap-0 md:gap-10">
              <div className="w-[107px] md:w-auto shadow-home rounded-xl p-4 lg:py-6 xl:px-8 flex items-center gap-2 lg:gap-[23px] justify-center lg:text-start flex-col">
                <img
                  src="/ImagesHome/TotalPrograma.png"
                  alt="Total Programa"
                  className="w-[75px] h-[75px] rounded-lg"
                />
                <p className="text-[22px] leading-[25.75px] font-semibold">{countPrograms}</p>
                <p className="text-xs lg:text-[16px] font-normal leading-custom">Total de programas</p>
              </div>

              <div className="w-[107px] md:w-auto shadow-home rounded-xl p-4 lg:py-6 xl:px-8 flex items-center gap-2 lg:gap-[23px] justify-center lg:text-start flex-col">
                <img
                  src="/ImagesHome/ProgramaCompleto.png"
                  alt="Programa Completo"
                  className="w-[75px] h-[75px] rounded-lg"
                />
                <p className="text-[22px] leading-[25.75px] font-semibold">{countClassRooms}</p>
                <p className="text-xs lg:text-[16px] font-normal leading-custom">Programas completos</p>
              </div>

              <div className="w-[107px] md:w-auto shadow-home rounded-xl p-4 lg:py-6 xl:px-8 flex items-center gap-2 lg:gap-[23px] justify-center lg:text-start flex-col">
                <img
                  src="/ImagesHome/CargaHoraria.png"
                  alt="Carga Horaria"
                  className="w-[75px] h-[75px] rounded-lg"
                />
                <p className="text-[22px] leading-[25.75px] font-semibold">{hourlyLoad} hrs</p>
                <p className="text-xs lg:text-[16px] font-normal leading-custom">Total carga horaria</p>
              </div>
            </div>

            <div className="order-3 lg:order-3 flex-grow flex flex-col">
              <DisplayNextClasses
                classes={classes}
                loading={loading}
                error={error}
                refresh={handleRefresh}
                buttonFunction={handleEditContentClass}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between items-center gap-4 xl:gap-14 md:max-w-[75%] md:mx-auto lg:w-[369px] xl:w-auto xl:max-w-[800px]">
            <div className="order-2 xl:order-1 shadow-home rounded-xl p-4 md:py-6 md:px-8 flex flex-col gap-6 md:h-[487px] w-full">
              <h2 className="text-xl leading-6 font-semibold">
                Últimas Novedades
              </h2>
              <p className="leading-custom">
                Mantente al día con las últimas actualizaciones y eventos.
                Descubre nuevos recursos disponibles para mejorar tus clases,
                tips para un mejor manejo de tus aulas virtuales, y noticias
                relevantes del mundo de la educación.
              </p>
              <img
                src="/ImagesHome/novedades.PNG"
                alt="Últimas Novedades"
                className="object-contain rounded-md max-w-auto md:h-[300px]"
              />
            </div>

            <div className="xl:order-2 flex flex-col items-center gap-4 w-full">
              <h2 className="text-xl leading-6 font-semibold mb-2">
                Preguntas Frecuentes
              </h2>
              <div className="shadow-home rounded-xl p-4 md:py-6 md:px-8 flex items-center justify-center w-full md:w-auto gap-6 xl:max-w-[390px]">
                <img
                  src="/ImagesHome/preguntash.png"
                  alt="Preguntas"
                  className="object-cover rounded-lg lg:w-[40%]"
                />
                <div className="flex flex-col justify-between gap-4">
                  <button
                    onClick={() => navigate("/questions")}
                    className="bg-Purple tracking-wide text-white whitespace-nowrap font-extrabold px-4 py-2 rounded-lg ease-out duration-6000"
                  >
                    Ver preguntas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Home;
