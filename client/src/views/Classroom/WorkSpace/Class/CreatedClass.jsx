import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatedProgram({ onClose, logo, pathProgram, pathNewClass }) {
  const navigate = useNavigate();

  return (
    <div>
      <img src={logo} alt="Programa creado" />
    </div>
  );
}
