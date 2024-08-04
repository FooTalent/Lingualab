import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#444] bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-2/3 max-w-6xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="text-Purple text-4xl hover:text-gray-900">&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
