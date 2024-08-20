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
      <div className="relative">
        <img
          src="/ImagesLanding/FondoLandingPrincipal.png"
          alt="Fondo Landing Principal"
          className="w-full h-auto"
        />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-start items-start p-12 space-y-6">
          <div className="space-y-4">
            <h1
              className="text-[53px] font-bold text-white text-center"
              style={{ marginTop: "-18px" }}
            >
              <br />
              ¡Te damos la bienvenida <br />
              a LinguaLab!
            </h1>
            <h2
              className="text-[36px] font-bold text-white"
              style={{ marginTop: "16px" }}
            >
              Plataforma de enseñanza de idiomas
            </h2>
          </div>
          <p className="text-[22px] text-white mt-6 max-w-lg">
            Descubre todo lo que necesitas para enseñar y <br />
            aprender idiomas en nuestra plataforma. Gestioná <br />
            tus clases, accede a recursos y crea contenido.
            <br />
            <br />
            <br />
          </p>
          <button onClick={handleScroll} className="bg-[#FFDC00] text-[#444444] font-bold text-[22px] mt-12 rounded-md px-2 py-3 w-[320px] h-[60px] flex items-center justify-center">
            Ver más información
          </button>
        </div>
      </div>

      <div className="container mx-auto py-12 text-center px-4 md:px-8" ref={targetRef}>
        <h2 className="text-4xl font-bold mb-8 text-center">¿Qué ofrecemos?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded p-4 pl-28">
            <h3 className="text-2xl font-bold mb-4 text-left">
              Recursos para Docentes
            </h3>
            <div className="flex items-start mb-2">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Check"
                className="w-6 h-6"
              />
              <p className="ml-2 text-left text-lg pl-8">
                Accede a plantillas de clases, <br />
                programas y recursos específicos para <br />
                enseñar idiomas.
              </p>
            </div>
            <div className="flex items-start">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Check"
                className="w-6 h-6"
              />
              <p className="ml-2 text-left text-lg pl-8">
                Crea programas de estudio <br />
                personalizados para cada materia.
              </p>
            </div>
          </div>
          <div className="rounded p-4 pl-20">
            <h3 className="text-2xl font-bold mb-4 text-left">
              Seguimiento de Estudiantes
            </h3>
            <div className="flex items-start mb-2">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Check"
                className="w-6 h-6"
              />
              <p className="ml-2 text-left text-lg  pl-8">
                Visualiza la lista de tus estudiantes, sus <br />
                calificaciones y datos personales.
              </p>
            </div>
            <div className="flex items-start">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Check"
                className="w-6 h-6"
              />
              <p className="ml-2 text-left text-lg  pl-8">
                Mantén un registro completo de su <br />
                progreso.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 text-center relative">
        <h2 className="text-3xl font-bold mb-14">¿Cómo funciona?</h2>
        <div className="relative grid grid-cols-1 gap-8 items-center z-10">
          <div className="bg-[#9747FF] rounded-3xl text-white w-[800px] h-[225px] mx-auto z-20">
            <div className="flex items-center h-full w-[587px] mx-auto gap-16">
              <h3 className="text-[28px] font-bold w-1/2">
                Crea tus programas
              </h3>
              <p className="text-[24px] font-medium w-1/2">
                Diseña temarios y programas de estudio
              </p>
            </div>
          </div>

          <div className="ml-[260px] bg-[#9747FF] rounded-3xl text-white w-[750px] h-[250px] z-20">
            <div className="flex items-center h-full w-[672px] gap-16 mx-auto">
              <h3 className="text-[28px] font-extrabold text-center w-[206px]">
                Imparte clases <br />
                virtuales
              </h3>
              <div className="flex flex-col gap-8 w-[402px]">
                <p className="text-[26px] font-medium">
                  Utiliza nuestras herramientas interactivas para enseñar en
                  línea.
                </p>
                <p className="text-[26px] font-medium">
                  Comparte recursos multimedia y actividades prácticas.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute left-[960px] top-[320px] z-10">
          <img
            src="/ImagesLanding/comofunciona.png"
            alt="Cómo funciona"
            className="w-[649px] h-[370px]"
          />
        </div>
      </div>

      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Nunca fue tan fácil y rápido crear y compartir una clase
        </h2>
        <div className="p-4 mx-auto max-w-6xl">
          <img
            src="/ImagesLanding/TaskFlow.png"
            alt="Task Flow"
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="bg-[#9747FF] py-12 px-4">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="md:col-span-2 text-white flex flex-col items-center">
            <h3 className="text-center text-3xl mb-4">Domina un nuevo idioma con recursos interactivos</h3>
          </div>

          <div className="flex justify-center md:justify-start items-center px-4">
            <img
              src="/ImagesLanding/dominarecursos.png"
              alt="Recursos"
              className="mt-4 w-4/5 h-auto"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 px-4">
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


      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-8">Contamos con funciones como</h2>
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

      <div className="py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          ¿Por qué elegirnos?
        </h2>{" "}
        <br />
        <div className="px-64">
          <ul className="list-none space-y-4">
            <li className="flex items-start">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Check"
                className="w-6 h-6 mr-3"
              />
              <div className="ml-4 text-lg ">
                <p>
                  <span className="font-bold">Flexibilidad:</span> Aprende y
                  enseña desde cualquier lugar.
                </p>{" "}
                <br />
              </div>
            </li>
            <li className="flex items-start">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Check"
                className="w-6 h-6 mr-3"
              />
              <div className="ml-4 text-lg ">
                <p>
                  <span className="font-bold">Recursos:</span> Accede a
                  canciones, ejercicios gramaticales, juegos y más.
                </p>{" "}
                <br />
              </div>
            </li>
            <li className="flex items-start">
              <img
                src="/ImagesLanding/vistoMorado.svg"
                alt="Check"
                className="w-6 h-6 mr-3"
              />
              <div className="ml-4 text-lg ">
                <p>
                  <span className="font-bold ">Gestión Simplificada:</span>{" "}
                  Organiza tus clases de manera eficiente.
                </p>{" "}
                <br />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;
