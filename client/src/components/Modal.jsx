import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white flex flex-col gap-4 rounded-lg shadow-modal py-6 px-8 w-1/2 text-card">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="hover:text-Purple"
          >
            <CloseIcon />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
