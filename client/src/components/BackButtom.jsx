import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BackButton = ({ ...props }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleGoBack}
      className={`flex items-center gap-4 border border-card rounded-lg p-3 font-medium text-lg text-card hover:text-white hover:bg-card ease-linear duration-150`}
      {...props}
    >
      <ArrowBackIcon />
      Volver
    </button>
  );
};

export default BackButton;