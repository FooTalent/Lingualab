import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = '', ...props }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleGoBack}
      className={`bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 ${className}`}
      {...props}
    >
      Volver atrás
    </button>
  );
};

export default BackButton;