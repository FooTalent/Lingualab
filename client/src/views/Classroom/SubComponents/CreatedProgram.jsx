import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatedProgram({ onClose, logo, pathProgram, pathNewClass, label, closeLabel }) {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <img src={logo} alt="Programa creado" className='mx-auto max-h-[390px]' />
      </div>

      <h2 className='text-xl text-center font-medium'>
        {label}
      </h2>

      <div className='flex flex-col xl:grid grid-cols-2 gap-3 xl:gap-6'>
        <button
          onClick={() => {
            onClose();
            navigate(pathProgram || "/");
          }}
          className="border border-Purple bg-white hover:bg-Purple text-Purple hover:text-white font-extrabold py-3 px-8 rounded-lg ease-linear duration-150"
        >
          {closeLabel}
        </button>
        <button
          onClick={() => {
            onClose();
            navigate(pathNewClass || "/");
          }}
          className="border border-Purple bg-Purple hover:bg-PurpleHover text-white font-extrabold py-3 px-8 rounded-lg ease-linear duration-150"
        >
          Crear clase
        </button>
      </div>
    </div>
  );
}
