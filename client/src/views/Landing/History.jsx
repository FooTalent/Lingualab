const History = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="bg-[#FFF8CC] p-10" style={{ fontSize: "23px" }}>
        <h1 className="text-center text-4xl font-bold mb-6 text-[#444444]">
          Cómo nace LinguaLab?
        </h1>
        <div className="mt-16 flex flex-col items-center">
          <div className="text-justify max-w-5xl mx-auto">
            <p className="mb-4 text-[#444444]">
              Nace a través de la colaboración de nuestro equipo junto a Foo
              Talent Group, con el desafío de crear un proyecto real.
            </p>
            <p className="mb-4 text-[#444444]">
              En este programa se nos pidió identificar una problemática
              existente para diseñar y desarrollar una solución basada en una
              necesidad.
            </p>
            <p className="mb-10 text-[#444444]">
              Nosotros decidimos abordar el área educativa adaptándola a la
              evolución tecnológica, creando una herramienta efectiva para
              optimizar los tiempos de los docentes y gestionar una educación de
              calidad.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mb-10 text-[#444444] justify-center mt-16">
        <img src="/ImagesHistory/1paso.png" alt="Paso 1" className="mr-10" />
        <div className="w-[650px] h-[200px] p-5 border border-[#444444] rounded-[20px] mt-10 mb-10">
          <h2 className="text-3xl font-bold mb-2">
            La problemática detectada ...
          </h2>
          <p className="mt-5" style={{ fontSize: "19px" }}>
            En base a la necesidad que tienen los docentes que dan clases de{" "}
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
            Son los docentes de idiomas, de todos los niveles educativos, que
            enseñan de forma virtual, y buscan mejorar la eficiencia de sus{" "}
            <br />
            clases y optimizando su tiempo.
          </p>
        </div>
        <img src="/ImagesHistory/2paso.png" alt="Paso 2" />
      </div>

      <div className="flex mb-10 text-[#444444] justify-center">
        <img src="/ImagesHistory/3paso.png" alt="Paso 3" className="mr-10" />
        <div className="mt-10 w-[650px] h-[260px] p-5 border border-[#000] rounded-[20px]">
          <h2 className="text-3xl font-bold mb-2">
            Cuáles son las necesidades a desarrollar?
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
            En qué consiste nuestra propuesta?
          </h2>
          <p className="mt-5" style={{ fontSize: "19px" }}>
            Desarrollar una página web dedicada a ayudar a los docentes a
            organizar su material y crear clases virtuales de manera más <br />
            óptima.
          </p>
        </div>
        <img src="/ImagesHistory/4paso.png" alt="Paso 4" />
      </div>
    </div>
  );
};

export default History;
