import { useAppStore } from "../../store/useAppStore";

const Landing = () => {

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
                className="text-[53px] font-bold text-white"
                style={{ marginTop: "-18px" }}
              >
                <br />
                ¡Bienvenido a LinguaLab!
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
              aprender idiomas en nuestra plataforma. Gestiona <br />
              tus clases, accede a recursos y crea contenido.
              <br />
              <br />
              <br />
            </p>
            <button className="bg-[#FFDC00] text-[#444444] font-bold text-[22px] mt-12 rounded-md px-2 py-3 w-[320px] h-[60px] flex items-center justify-center">
              Ver más información
            </button>
          </div>
        </div>

        <div className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Qué ofrecemos?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded p-4">
              <h3 className="text-xl font-bold mb-4">Recursos para Docentes</h3>
              <div className="flex items-center mb-2">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">
                  Accede a plantillas de clases, programas y recursos específicos para enseñar idiomas.
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">
                  Crea programas de estudio personalizados para cada materia.
                </p>
              </div>
            </div>
            <div className="rounded p-4">
              <h3 className="text-xl font-bold mb-4">Seguimiento de Alumnos</h3>
              <div className="flex items-center mb-2">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">
                  Visualiza la lista de tus alumnos, sus calificaciones y datos personales.
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">
                  Mantén un registro completo de su progreso.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Cómo funciona?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded p-4">
              <h3 className="text-xl font-bold mb-4">Crea tus programas</h3>
              <div className="flex items-center mb-2">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">Diseña temarios y programas de estudio</p>
              </div>
              <div className="flex items-center">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">
                  Invita a tus alumnos a unirse a tus programas
                </p>
              </div>
            </div>
            <div className="rounded p-4">
              <h3 className="text-xl font-bold mb-4">Imparte clases virtuales</h3>
              <div className="flex items-center mb-2">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">
                  Utiliza nuestras herramientas interactivas para enseñar en línea
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src="/ImagesLanding/vistoMorado.svg"
                  alt="Check"
                  className="w-6 h-6"
                />
                <p className="ml-2">
                  Comparte recursos multimedia y actividades prácticas
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Nunca fue fácil y rápido crear y compartir una clase
          </h2>
          <img
            src="/ImagesLanding/TaskFlow.png"
            alt="Task Flow"
            className="w-full h-auto mb-4"
          />
          <p className="text-xl font-bold">
            Accede a recursos para facilitar tus clases
          </p>
        </div>

      
        <div className="bg-[#9747FF] py-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-4">Domina un nuevo idioma con</h3>
              <h3 className="text-2xl font-bold mb-4">recursos interactivos.</h3>
              <img src="/ImagesLanding/recursos.png" alt="Recursos" className="mt-4" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/ImagesLanding/diccionario.png" alt="Diccionario" className="w-full h-auto" />
              <img src="/ImagesLanding/juegos.png" alt="Juegos" className="w-full h-auto" />
              <img src="/ImagesLanding/canciones.png" alt="Canciones" className="w-full h-auto" />
              <img src="/ImagesLanding/series.png" alt="Series" className="w-full h-auto" />
              <img src="/ImagesLanding/ejerciciogramatical.png" alt="Ejercicios Gramaticales" className="w-full h-auto" />
              <img src="/ImagesLanding/libros.png" alt="Libros" className="w-full h-auto" />
            </div>
          </div>
        </div>

        <div className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-8">Contamos con funciones como</h2>
          <img
            src="/ImagesLanding/funciones.png"
            alt="Funciones"
            className="w-full h-auto mb-4"
          />
        </div>


        <div className="bg-[#FFDC00] py-12">
          <div className="container mx-auto flex flex-wrap justify-between">
            {["docente", "docente", "docente", "docente", "docente", "docente"].map((property, index) => (
              <div key={index} className="w-[calc(16.666%-1rem)] bg-white p-4 rounded-lg mb-4 shadow-md">
                <h3 className="text-xl font-bold">{property}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="py-12 text-center">
          <h2 className="text-3xl font-bold mb-8">¿Por qué elegirnos?</h2>
          <ul className="list-none space-y-4">
            <li className="flex items-center">
              <img src="/ImagesLanding/vistoMorado.svg" alt="Check" className="w-6 h-6 mr-2" />
              <p><span className="font-bold">Flexibilidad:</span> Aprende y enseña desde cualquier lugar.</p>
            </li>
            <li className="flex items-center">
              <img src="/ImagesLanding/vistoMorado.svg" alt="Check" className="w-6 h-6 mr-2" />
              <p><span className="font-bold">Recursos:</span> Accede a canciones, ejercicios gramaticales, juegos y más.</p>
            </li>
            <li className="flex items-center">
              <img src="/ImagesLanding/vistoMorado.svg" alt="Check" className="w-6 h-6 mr-2" />
              <p><span className="font-bold">Gestión Simplificada:</span> Organiza tus clases de manera eficiente.</p>
            </li>
          </ul>
        </div>
      </div>
    );
};

export default Landing;
