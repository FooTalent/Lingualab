import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, title, children, modalSize }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#444] bg-opacity-15 flex justify-center items-center z-50">
      <div className={`bg-white flex flex-col gap-2 shadow-modal max-w-5xl py-5 px-10 text-card overflow-y-auto scrollbar
        ${modalSize === 'small' ? 'w-5/12  rounded-3xl'
          : modalSize === 'xsmall' ? 'w-4/12 rounded-3xl'
            : modalSize === 'full' ? 'w-full h-[90%] self-end rounded-2xl px-5' : 'w-3/4 rounded-2xl'} 
        `}
      >
        {
          title
            ? <div className="flex flex-col gap-2">
              <button
                onClick={onClose}
                className="text-Purple hover:text-black self-end"
              >
                <CloseIcon fontSize='large' />
              </button>

              <h2 className="text-customTitle font-semibold self-start">{title}</h2>
            </div>
            : <></>
        }

        {children}
      </div>
    </div>
  );
};

export default Modal;
