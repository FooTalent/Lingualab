import { useAppStore } from "../store/useAppStore";

const History = () => {
  const { status } = useAppStore();
  if (status) return (
    <div className="bg-[#FFF8CC] w-screen min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-6">¿Cómo nace LinguaLab?</h1>
      <p className="mb-4">Nace a través de la colaboración de nuestro equipo junto a Foo Talent Group, con el desafío de crear un proyecto real.</p>
      <p className="mb-4">En este programa se nos pidió identificar una problemática existente para diseñar y desarrollar una solución basada en una necesidad.</p>
      <p className="mb-10">Nosotros decidimos abordar el área educativa adaptándola a la evolución tecnológica, creando una herramienta efectiva para optimizar los tiempos de los docentes y gestionar una educación de calidad.</p>
      
      <div className="flex mb-10">
        <img src="/ImagesHistory/1paso.png" alt="Paso 1" className="mr-10" />
        <div className="w-[862px] h-[265px] p-5 border-t border-l border-r-0 border-b-0 border-[#000] rounded-tl-[20px] opacity-0">
          <h2 className="text-2xl font-bold mb-2">La problemática detectada ...</h2>
          <p>En base a la necesidad que tienen los docentes que dan clases de idiomas de forma remota, que tiene distribuidos los recursos en múltiples espacios.</p>
        </div>
      </div>
      
      <div className="flex mb-10">
        <div className="w-[862px] h-[265px] p-5 border-t border-l border-r-0 border-b-0 border-[#000] rounded-tl-[20px] opacity-0 mr-10">
          <h2 className="text-2xl font-bold mb-2">Nuestro público objetivo ...</h2>
          <p>Son los docentes de idiomas, de todos los niveles educativos, que enseñan de forma virtual, y buscan mejorar la eficiencia de sus clases y optimizando su tiempo.</p>
        </div>
        <img src="/ImagesHistory/2paso.png" alt="Paso 2" />
      </div>
      
      <div className="flex mb-10">
        <img src="/ImagesHistory/3paso.png" alt="Paso 3" className="mr-10" />
        <div className="w-[862px] h-[265px] p-5 border-t border-l border-r-0 border-b-0 border-[#000] rounded-tl-[20px] opacity-0">
          <h2 className="text-2xl font-bold mb-2">Cuáles son las necesidades a desarrollar ?</h2>
          <ul className="list-disc pl-5">
            <li>Centralizar y organizar sus recursos dispersos.</li>
            <li>Facilitar la gestión y optimización del tiempo en la creación y administración de clases virtuales.</li>
            <li>Diseñar una interfaz fácil e intuitiva.</li>
          </ul>
        </div>
      </div>
      
      <div className="flex mb-10">
        <div className="w-[862px] h-[265px] p-5 border-t border-l border-r-0 border-b-0 border-[#000] rounded-tl-[20px] opacity-0 mr-10">
          <h2 className="text-2xl font-bold mb-2">En qué consiste nuestra propuesta ?</h2>
          <p>Desarrollar una página web dedicada a ayudar a los docentes a organizar su material y crear clases virtuales de manera más óptima.</p>
        </div>
        <img src="/ImagesHistory/4paso.png" alt="Paso 4" />
      </div>
    </div>
  );

  return null;
}

export default History;
