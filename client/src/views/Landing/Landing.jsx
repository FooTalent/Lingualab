import { useRef } from "react";
import Carousel from "./Carousel";

const Landing = () => {

  const targetRef = useRef(null)

  const handleScroll = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }
  return (
    <div className="text-[#444444]">
      <div className="bg-fondoLanding bg-no-repeat bg-cover">
        <div className="md:ml-28 ml-5 md:py-[50px] py-[10px] md:gap-16 gap-4 flex flex-col">
          <div className="flex flex-col md:gap-6 gap-4">
            <h1
              className="md:text-[56px] text-[18px] text-white font-bold"
            >
              <br />
              ¡Te damos la bienvenida <br />
              a LinguaLab!
            </h1>
            <h2
              className="md:text-[39px] text-[14px] font-bold text-white"
            >
              Plataforma de enseñanza de idiomas
            </h2>
          </div>
          <p className="md:text-[28px] text-[12px] text-white font-normal">
            Descubre todo lo que necesitas para enseñar y <br />
            aprender idiomas en nuestra plataforma. Gestioná <br />
            tus clases, accede a recursos y crea contenido.
          </p>
          <button onClick={handleScroll} className="w-fit md:px-12 px-3 md:py-3 py-4 md:rounded-lg rounded-[4px] font-medium md:text-[28px] text-[12px] bg-[#FFDC00] text-[#444444]">
            Ver más información
          </button>
        </div>
      </div>

      <div className="flex flex-col justify-center md:gap-16 gap-8 py-12 md:mx-28 items-center text-center px-4 md:px-8" ref={targetRef}>
        <h2 className="md:text-4xl text-[20px] font-bold md:mb-8 text-center">¿Qué ofrecemos?</h2>
        <div className="flex md:gap-[78px] gap-[32px] flex-col md:flex-row">
          <div className="flex flex-col md:gap-8 gap-4">
            <h3 className="md:text-2xl text-lg font-bold mb-4 md:text-left text-center">
              Recursos para Docentes
            </h3>
            <div className="flex md:gap-12 gap-4 flex-col">
              <div className="flex items-center md:gap-12 gap-4">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="md:w-12 md:h-12 w-6 h-6"
                />
                <p className="md:text-2xl text-[16px] text-left font-normal">
                  Accede a plantillas de clases, <br className="hidden md:flex" />
                  programas y recursos específicos para <br className="hidden md:flex" />
                  enseñar idiomas.
                </p>
              </div>
              <div className="flex items-center md:gap-12 gap-4">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="md:w-12 md:h-12 w-6 h-6"
                />
                <p className="md:text-2xl text-[16px] text-left font-normal">
                  Crea programas de estudio <br className="hidden md:flex" />
                  personalizados para cada materia.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="md:text-2xl text-lg font-bold md:mb-4 md:text-left text-center">
              Seguimiento de Estudiantes
            </h3>
            <div className="flex md:gap-12 gap-4 flex-col">
              <div className="flex items-center md:gap-12 gap-4">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="md:w-12 md:h-12 w-6 h-6"
                />
                <p className="md:text-2xl text-[16px] text-left font-normal">
                  Visualiza la lista de tus estudiantes, sus <br className="hidden md:flex" />
                  calificaciones y datos personales.
                </p>
              </div>
              <div className="flex items-center md:gap-12 gap-4">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="md:w-12 md:h-12 w-6 h-6"
                />
                <p className="md:text-2xl text-[16px] text-left font-normal">
                  Mantén un registro completo de su <br className="hidden md:flex" />
                  progreso.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="md:py-12 text-center relative">
        <h2 className="text-3xl font-bold mb-14">¿Cómo funciona?</h2>
        <div className="relative grid grid-cols-1 md:gap-8 gap-2 items-center z-10">
          <div className="bg-[#9747FF] md:rounded-3xl rounded-lg p-4 md:p-0 text-white md:w-[800px] md:h-[225px] gap-[10px] md:gap-0 mx-auto md:z-20">
            <div className="flex items-center h-full md:w-[587px] mx-auto gap-[8px] md:gap-16">
              <h3 className="md:text-[28px] text-[12px] md:font-extrabold font-semibold md:w-1/2 w-1/3">
                Crea tus programas
              </h3>
              <p className="md:text-[24px] text-[10px] md:font-medium font-normal md:w-1/2">
                Diseña temarios y programas de estudio
              </p>
            </div>
          </div>

          <div className="2xl:ml-[260px] md:ml-[50px] ml-[19px] bg-[#9747FF] md:rounded-3xl rounded-lg md:gap-0 gap-[10px] md:p-0 p-[12px] text-white md:w-[750px] w-[274px] md:h-[250px] h-[92px] md:z-20">
            <div className="flex items-center h-full md:w-[672px] md:gap-16 gap-2 mx-auto">
              <h3 className="md:text-[28px] text-[12px] md:font-extrabold font-semibold text-center md:w-[206px]">
                Imparte clases <br />
                virtuales
              </h3>
              <div className="flex flex-col md:gap-8 md:w-[402px] gap-2">
                <p className="md:text-[26px] text-[10px] font-medium">
                  Utiliza nuestras herramientas interactivas para enseñar en
                  línea.
                </p>
                <p className="md:text-[26px] text-[10px] font-medium">
                  Comparte recursos multimedia y actividades prácticas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute 2xl:left-[960px] 2xl:top-[320px] md:left-[760px] md:top-[300px] left-[280px] top-[140px] z-10">
          <img
            src="/ImagesLanding/comofunciona.png"
            alt="Cómo funciona"
            className="2xl:w-[649px] 2xl:h-[370px] md:w-[550px] md:h-[300px] w-[148px] h-[80px]"
          />
        </div>
      </div>

      <div className="flex flex-col md:py-10 py-6 text-center">
        <h2 className="md:text-3xl text-xl font-bold md:mb-8">
          Nunca fue tan fácil y rápido crear y <br className="md:hidden flex" />
          compartir una clase
        </h2>
        <div className="p-4 mx-auto max-w-6xl">
          <img
            src="/ImagesLanding/TaskFlow.png"
            alt="Task Flow"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="bg-[#9747FF] md:py-12 py-5 px-4">
        <div className="max-w-screen-xl mx-auto flex items-center flex-col gap-4">
          <div className="md:col-span-2 text-white flex flex-col items-center">
            <h3 className="text-center md:text-3xl text-lg mb-4">Domina un nuevo idioma con recursos interactivos</h3>
          </div>
          <div className="flex md:flex-row flex-col md:gap-0 gap-4">
            <div className="flex justify-center md:justify-start md:items-center md:px-4">
              <img
                src="/ImagesLanding/dominarecursos.png"
                alt="Recursos"
                className="md:mt-4 md:w-4/5 w-3/5 h-auto"
              />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-3 gap-4 px-4">
              <img
                src="/ImagesLanding/diccionario.png"
                alt="Diccionario"
                className="w-44 h-auto"
              />
              <img
                src="/ImagesLanding/juegos.png"
                alt="Juegos"
                className="w-44 h-auto"
              />
              <img
                src="/ImagesLanding/canciones.png"
                alt="Canciones"
                className="w-44 h-auto"
              />
              <img
                src="/ImagesLanding/series.png"
                alt="Series"
                className="w-44 h-auto"
              />
              <img
                src="/ImagesLanding/ejerciciogramatical.png"
                alt="Ejercicios Gramaticales"
                className="w-44 h-auto"
              />
              <img
                src="/ImagesLanding/libros.png"
                alt="Libros"
                className="w-44 h-auto"
              />
            </div>
          </div>
        </div>
      </div>


      <div className="md:py-12 py-4 text-center">
        <h2 className="md:text-3xl text-[20px] font-bold md:mb-8">Contamos con funciones como</h2>
        <div className="p-4 mx-auto max-w-6xl">
          <img
            src="/ImagesLanding/funciones.png"
            alt="Task Flow"
            className="w-4/5 h-auto mx-auto"
          />
        </div>
      </div>

      <div className="bg-[#FFDC00] w-full">
        <Carousel />
      </div>

      <div className="flex flex-col items-center md:gap-[60px] gap-10 py-8 mx-4">
        <h2 className="md:text-3xl text-[20px] font-bold text-center">
          ¿Por qué elegirnos?
        </h2>
        <ul className="flex flex-col md:gap-12 gap-6 list-none">
          <li className="flex md:gap-12 gap-4 items-center">
            <img
              src="/ImagesLanding/vistoMorado.svg"
              alt="Check"
              className="md:w-12 md:h-12 w-6 h-6"
            />
            <p className="md:text-2xl text-[16px] font-normal">
              <span className="font-bold">Flexibilidad:</span> Aprende y
              enseña desde cualquier lugar.
            </p>
          </li>
          <li className="flex md:gap-12 gap-4 items-center">
            <img
              src="/ImagesLanding/vistoMorado.svg"
              alt="Check"
              className="md:w-12 md:h-12 w-6 h-6"
            />
            <p className="md:text-2xl text-[16px] font-normal">
              <span className="font-bold">Recursos:</span> Accede a
              canciones, ejercicios gramaticales, juegos y más.
            </p>
          </li>
          <li className="flex md:gap-12 gap-4 items-center">
            <img
              src="/ImagesLanding/vistoMorado.svg"
              alt="Check"
              className="md:w-12 md:h-12 w-6 h-6"
            />
            <p className="md:text-2xl text-[16px] font-normal">
              <span className="font-bold ">Gestión Simplificada:</span>{" "}
              Organiza tus clases de manera eficiente.
            </p>
          </li>
        </ul>

      </div>
    </div>

  );
};

export default Landing;
