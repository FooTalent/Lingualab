import { useEffect, useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import SearchIcon from "@mui/icons-material/Search";
import { getNextNClassesByTeacher } from "../../services/programs.services";
import DisplayNextClasses from "./DisplayNextClasses";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, status, userDetail } = useAppStore();
  const navigate = useNavigate(); 

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(classes);

  useEffect(() => {
    if (user && user.token) {
      const fetchClasses = async () => {
        try {
          setLoading(true);
          const response = await getNextNClassesByTeacher(user.token, 2);
          if (response.isError) {
            throw new Error(response.message);
          }
          setClasses(response.data);
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
  }, [user, userDetail]);

  if (status)
    return (
      <div className="flex flex-col gap-12 text-card">
        <div className="flex justify-between items-center">
          <h1 className="text-home leading-9 font-semibold">
            ¡Te damos la bienvenida!
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-4 justify-between flex-1">
            <div className="shadow-home rounded-xl px-8 flex items-center gap-6 h-[250px] w-[700px]">
              <div className="flex-1">
                <img
                  src="/ImagesHome/creacionvideo.PNG"
                  alt="PopupComencemos"
                  className="max-w-80 h-[230px]"
                />
              </div>

              <div className="flex flex-col justify-between gap-4 flex-1">
                <h2 className="text-xl leading-6 font-semibold">
                  ¡Empecemos a dar clases!
                </h2>
                <p className="leading-custom">
                  Ingresa a ver más para acceder al instructivo de cómo crear
                  tus programas, clases, y cómo agregar materiales. Encontrá
                  recursos útiles, un recorrido completo por la página y
                  descubre cómo gestionar a tus alumnos.
                </p>
                <button
                 onClick={() => navigate("/videotutorial")}  
                className="bg-card hover:bg-Yellow text-Yellow tracking-wide hover:text-card font-extrabold px-4 py-2 rounded-lg self-start ease-out duration-6000">
                  Tutorial
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-10 m-0">
              <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4">
                <img
                  src="/ImagesHome/TotalPrograma.png"
                  alt="Total Programa"
                  className="w-[75px] h-auto rounded-lg"
                />
                <p className="text-xl font-semibold leading-6">15</p>
                <p className="leading-custom">Total de programas</p>
              </div>

              <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4">
                <img
                  src="/ImagesHome/ProgramaCompleto.png"
                  alt="Programa Completo"
                  className="w-[75px] h-auto rounded-lg"
                />
                <p className="text-xl font-semibold leading-6">6</p>
                <p className="leading-custom">Programas completos</p>
              </div>

              <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4">
                <img
                  src="/ImagesHome/CargaHoraria.png"
                  alt="Carga Horaria"
                  className="w-[75px] h-auto rounded-lg"
                />
                <p className="text-xl font-semibold leading-6">120 hrs</p>
                <p className="leading-custom">Total carga horaria</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 m-0 mt-6">
              <div className="flex flex-col gap-4">
                <h2 className="text-xl leading-6 font-semibold mb-2">Tu clase ahora</h2>
                <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4 text-center items-center">
                  <img
                    src="/ImagesHome/campana.png"
                    alt="Campana"
                    className="h-auto rounded-lg"
                  />
                  <p className="font-bold">No tienes clases creadas</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <h2 className="text-xl leading-6 font-semibold mb-2">Tu próxima clase</h2>
                <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-4 text-center items-center">
                  <img
                    src="/ImagesHome/calendarioh.png"
                    alt="Calendario"
                    className="h-auto rounded-lg"
                  />
                  <p className="font-bold">No tienes clases programadas</p>
                </div>
              </div>
            </div>

            <DisplayNextClasses
              classes={classes}
              loading={loading}
              error={error}
            />
          </div>

          <div className="flex flex-col justify-between gap-8 lg:max-w-[390px]">
            <div className="shadow-home rounded-xl py-6 px-8 flex flex-col gap-6 h-[480px] w-[330px]">
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
                className="object-contain rounded-md max-w-auto h-[300px]"
              />
            </div>

            <div className="flex flex-col gap-4 mb-10">
              <h2 className="text-xl leading-6 font-semibold mb-2">Preguntas Frecuentes</h2>
              <div className="shadow-home rounded-xl py-6 px-8 flex items-center gap-6 max-w-[390px]">
                <img
                  src="/ImagesHome/preguntash.png"
                  alt="Preguntas"
                  className="object-cover rounded-lg max-h-[185px]"
                />
                <div className="flex flex-col justify-between gap-4">
                <button
                    onClick={() => navigate("/questions")} 
                    className="bg-Purple tracking-wide text-white font-extrabold px-4 py-2 rounded-lg ease-out duration-6000"
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
