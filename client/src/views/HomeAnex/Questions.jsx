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
    <div className="flex flex-col items-start text-card gap-6">
      <button
        className="flex items-center gap-4 bg-transparent hover:bg-card text-card hover:text-white border border-card rounded-md text-lg font-medium p-3 ease-out duration-300"
        onClick={handleGoBack}
      >
        <ArrowBackIcon />
        Volver
      </button>

      <div className='w-full flex flex-col gap-6 xl:grid grid-cols-3'>
        <h1 className="lg:text-[32px] leading-9 font-medium text-custom">
          Preguntas Frecuentes
        </h1>

        <img src="/ImagesHome/preguntasfrecuentes.png" alt="Preguntas Frecuentes" className="object-cover m-auto" />
      </div>

      <div className="bg-white shadow-questions rounded-xl p-4 w-full">
        {faqs.map((faq, index) => (
          <div key={index}>
            <div
              className={`cursor-pointer flex justify-between items-center py-4 px-5 border-b ${activeIndex == index ? 'border-white' : 'border-Grey'} ease-out duration-300`}
              onClick={() => handleToggle(index)}
            >
              <span className="text-card text-xl leading-6 font-medium">{faq.question}</span>
              <span
                className={`transform transition-transform ease-out duration-300 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}
              >
                <svg
                  className="w-6 h-6 text-Purple"
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

            <div
              className={`overflow-hidden transition-max-height ease-out duration-300 ${activeIndex === index ? 'max-h-40 md:max-h-16' : 'max-h-0'}`}
            >
              <div className="px-4 py-5 text-card text-sm leading-4 border-b border-Grey ease-out duration-300">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;


