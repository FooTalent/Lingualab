import React from 'react';
import ICONS from './iconMapping'; // Asegúrate de que la ruta sea correcta

const IconImage = ({ category, className }) => {
  return (
    <img 
      src={ICONS[category]} 
      alt={`ícono de ${category}`}
      className={className}
    />
  );
};

export default IconImage;
