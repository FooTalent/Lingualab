import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatedProgram({ onClose, logo, pathProgram, pathNewClass }) {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col gap-8'>
      <div>
        <img src={logo} alt="Programa creado" />
      </div>

      <h2 className='text-xl text-center font-medium'>
        ¿Desea agregarle los recursos a la clase o ir al programa?
      </h2>

      <div className='grid grid-cols-2 gap-6'>
        <button
          onClick={onClose}
          className="border border-Purple bg-white hover:bg-Purple text-Purple hover:text-white font-extrabold py-3 px-8 rounded-lg mr-2 ease-linear duration-150"
        >
          Ir al programa
        </button>
        <button
          onClick={() => {
            onClose();
            navigate(pathNewClass || "/");
          }}
          className="border border-Purple bg-Purple hover:bg-PurpleHover text-white font-extrabold py-3 px-8 rounded-lg ease-linear duration-150"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
