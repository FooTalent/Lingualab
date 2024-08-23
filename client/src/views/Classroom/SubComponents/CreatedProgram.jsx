import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatedProgram({ onClose, logo, pathProgram, pathNewClass, label, closeLabel }) {
  const navigate = useNavigate();

  return (
    <div>
      <img src={logo} alt="Programa creado" className='mx-auto max-h-[390px]' />
    </div>
  );
}
