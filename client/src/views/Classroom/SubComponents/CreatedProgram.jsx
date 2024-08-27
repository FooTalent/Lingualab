import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatedProgram({ onClose, logo, pathProgram, pathNewClass, label, closeLabel }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <img src={logo} alt="Programa creado" className='mx-auto max-h-[390px]' />
    </div>
  );
}
