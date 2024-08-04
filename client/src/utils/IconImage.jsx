import React from 'react';
import ICONS from './iconMapping';

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
