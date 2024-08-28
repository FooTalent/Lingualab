const History = () => {
  return (
    <div className="w-full md:min-h-screen">
      <div className="bg-[#FFF8CC] flex flex-col justify-center items-center gap-[32px] md:gap-[80px] px-[20px] md:px-[115px] py-[24px] md:py-[80px]">
        <h1 className="text-center md:text-[56px] text-[20px] font-bold text-[#444444]">
          ¿Cómo nace LinguaLab?
        </h1>
        <div className="max-w-[1210px] leading-[18,75px] md:leading-[42px] md:tracking-[0.01em] font-normal text-justify text-[16px] md:text-[28px] text-[#444444]">
          <p>
            Nace a través de la colaboración de nuestro equipo junto a Foo
            Talent Group, con el desafío de crear un proyecto real.
            <br />
            En este programa se nos pidió identificar una problemática existente
            para diseñar y desarrollar una solución basada en una necesidad.
            <br />
            Nosotros decidimos abordar el área educativa adaptándola a la
            evolución tecnológica, creando una herramienta efectiva para
            optimizar los tiempos de los docentes y gestionar una educación de
            calidad.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-5 mt-8 md:hidden">
        <div className="flex flex-col items-center p-4 gap-3 shadow-history border border-Grey rounded-xl">
          <img
            src="/ImagesHistory/1paso.png"
            alt="Paso 1"
            className="w-[96px] h-20"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-extrabold text-center">
              La problemática detectada ...
            </h2>
            <p className="text-[16px] leading-[18,75px] text-justify font-normal">
              Tiene que ver con la necesidad que tienen los docentes que dan clases de
              idiomas de forma remota, que tienen distribuidos los recursos en
              múltiples espacios.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 gap-3 shadow-history border border-Grey rounded-xl">
          <img
            src="/ImagesHistory/2paso.png"
            alt="Paso 2"
            className="w-[96px] h-20"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-extrabold text-center">
            Nuestro público objetivo ...
            </h2>
            <p className="text-[16px] leading-[18,75px] text-justify font-normal">
            Son los docentes de idiomas de todos los niveles educativos que
              enseñan de forma virtual y buscan mejorar la eficiencia de sus
              clases y optimizar su tiempo.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 gap-3 shadow-history border border-Grey rounded-xl">
          <img
            src="/ImagesHistory/3paso.png"
            alt="Paso 3"
            className="w-[96px] h-20"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-lg leading-[21,09px] font-extrabold text-center">
            ¿Cuáles son las necesidades a desarrollar?
            </h2>
            <ul className="list-disc px-2 text-4 leading-[18,75px] text-justify font-normal">
              <li>
                Centralizar y organizar sus recursos dispersos.
              </li>
              <li>
                Facilitar la gestión y optimización del tiempo en la creación y
                administración de clases virtuales.
              </li>
              <li>
                Diseñar una interfaz fácil e intuitiva.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center p-4 gap-3 shadow-history border border-Grey rounded-xl">
          <img
            src="/ImagesHistory/4paso.png"
            alt="Paso 4"
            className="w-[96px] h-20"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-extrabold text-center">
            ¿En qué consiste nuestra propuesta?
            </h2>
            <p className="text-[16px] leading-[18,75px] text-justify font-normal">
            Desarrollar una página web dedicada a ayudar a los docentes a
              organizar su material y crear clases virtuales de manera
              óptima.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex mb-10 text-[#444444] justify-center mt-16">
          <img src="/ImagesHistory/1paso.png" alt="Paso 1" className="mr-10" />
          <div className="w-[650px] h-[200px] p-5 border border-[#444444] rounded-[20px] mt-10 mb-10">
            <h2 className="text-3xl font-bold mb-2">
              La problemática detectada ...
            </h2>
            <p className="mt-5" style={{ fontSize: "19px" }}>
              Tiene que ver con la necesidad que tienen los docentes que dan clases de{" "}
              <br />
              idiomas de forma remota, que tienen distribuidos los recursos en{" "}
              <br />
              múltiples espacios.
            </p>
          </div>
        </div>

        <div className="flex mb-10 text-[#444444] justify-center">
          <div className="w-[650px] h-[200px] p-5 border border-[#000] rounded-[20px] mr-10 mt-10">
            <h2 className="text-3xl font-bold mb-2">
              Nuestro público objetivo ...
            </h2>
            <p className="mt-5" style={{ fontSize: "19px" }}>
              Son los docentes de idiomas de todos los niveles educativos que
              enseñan de forma virtual y buscan mejorar la eficiencia de sus{" "}
              <br />
              clases y optimizar su tiempo.
            </p>
          </div>
          <img src="/ImagesHistory/2paso.png" alt="Paso 2" />
        </div>

        <div className="flex mb-10 text-[#444444] justify-center">
          <img src="/ImagesHistory/3paso.png" alt="Paso 3" className="mr-10" />
          <div className="mt-10 w-[650px] h-[260px] p-5 border border-[#000] rounded-[20px]">
            <h2 className="text-3xl font-bold mb-2">
              ¿Cuáles son las necesidades a desarrollar?
            </h2>
            <ul className="list-disc pl-5 ml-8">
              <li className="mt-5" style={{ fontSize: "19px" }}>
                Centralizar y organizar sus recursos dispersos.
              </li>
              <li className="mt-5" style={{ fontSize: "19px" }}>
                Facilitar la gestión y optimización del tiempo en la creación y
                administración de clases virtuales.
              </li>
              <li className="mt-5" style={{ fontSize: "19px" }}>
                Diseñar una interfaz fácil e intuitiva.
              </li>
            </ul>
          </div>
        </div>

        <div className=" mt-20 flex mb-10 text-[#444444] justify-center">
          <div className="w-[650px] h-[200px] p-5 border border-[#000] rounded-[20px] mr-10 mt-10 ">
            <h2 className="text-3xl font-bold mb-2">
              ¿En qué consiste nuestra propuesta?
            </h2>
            <p className="mt-5" style={{ fontSize: "19px" }}>
              Desarrollar una página web dedicada a ayudar a los docentes a
              organizar su material y crear clases virtuales de manera{" "}
              <br />
              óptima.
            </p>
          </div>
          <img src="/ImagesHistory/4paso.png" alt="Paso 4" />
        </div>
      </div>
    </div>
  );
};

export default History;
