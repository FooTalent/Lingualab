import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Questions = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate(); 

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleGoBack = () => {
    navigate('/'); 
  };

  const faqs = [
    {
      question: '1. ¿Es necesario descargar algún software para usar LinguaLab?',
      answer:
        'No, LinguaLab es una plataforma basada en la web, lo que significa que puedes acceder a ella desde cualquier navegador de internet sin necesidad de descargas o instalaciones adicionales.',
    },
    {
      question: '2. ¿Cómo se manejan las cancelaciones de clases en LinguaLab?',
      answer:
        'En caso de cancelaciones recurrentes, LinguaLab ofrece un sistema de seguimiento que permite a los docentes gestionar su agenda de manera eficiente y minimizar el impacto en su trabajo y en la plataforma. Los docentes pueden establecer reglas y políticas de cancelación para sus estudiantes.',
    },
    {
      question: '3. ¿Es LinguaLab accesible desde cualquier lugar?',
      answer:
        'Sí, puedes acceder a LinguaLab desde cualquier lugar con conexión a internet. La plataforma está diseñada para funcionar en diversos dispositivos, incluyendo computadoras de escritorio, laptops, tablets y teléfonos móviles.',
    },
    {
      question: '4. ¿Puedo usar LinguaLab para enseñar otros idiomas además del inglés?',
      answer:
        'Actualmente, LinguaLab está enfocada en la enseñanza del inglés, pero nuestro objetivo a largo plazo es expandir la plataforma para soportar la enseñanza de múltiples idiomas.',
    },
    {
      question: '5. ¿Hay una versión gratuita de LinguaLab?',
      answer:
        'Durante los primeros seis meses de lanzada la plataforma LinguaLab ofreceremos la forma gratuita para explorar la plataforma, luego serán restringidas algunas funciones.',
    },
    {
      question: '6. ¿Qué tipo de soporte ofrece LinguaLab?',
      answer: 'LinguaLab ofrece soporte técnico por correo electrónico y tutoriales.',
    },
  ];

  return (
    <div className="relative p-6">
      <button
        className="absolute top-4 left-4 flex items-center w-28 h-12 bg-transparent text-gray-700 border border-gray-700 rounded-md text-xl p-1"
        onClick={handleGoBack} 
      >
        <ArrowBackIcon className="mr-2" />
        Volver
      </button>

      <h1 className="mt-16 mr-2 text-gray-700 text-3xl font-semibold ">
        Preguntas Frecuentes
      </h1>

      <div className="flex justify-center my-6">
        <img src="/ImagesHome/preguntasfrecuentes.png" alt="Preguntas Frecuentes" className="max-w-full h-auto" />
      </div>

      <div
        className="mx-auto bg-white border border-gray-300 rounded-tl-md"
        style={{
          width: '1210px',
          height: '368px',
          padding: '16px 0px 0px 0px',
          borderRadius: '12px 0px 0px 0px',
        }}
      >
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="cursor-pointer flex justify-between items-center bg-white p-4 border-b border-gray-300"
              onClick={() => handleToggle(index)}
            >
              <span className="text-gray-700">{faq.question}</span>
              <span
                className={`transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
            </div>
            {activeIndex === index && (
              <div className="bg-white p-4 text-gray-700">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;


