import React, { useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ClassList from '../classes/ClassList';

export default function Modal({ open, setOpen, onNavigate, label }) {
  const classes = ['', '']

  useEffect(() => {
    if (open) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(false)
  }


  if (!open) return null

  return (
    <div className='fixed z-10 inset-0 flex items-center justify-center'>
      <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
      <div className='bg-white w-1/4 h-3/4 z-10'>
        <button onClick={handleOpen}><CloseIcon /></button>
        <div>
          <button className='cursor-pointer' onClick={() => onNavigate('PREV', true)}>
            <KeyboardArrowLeftIcon />
          </button>
          {label}
          <button className='cursor-pointer' onClick={() => onNavigate('NEXT', true)}>
            <KeyboardArrowRightIcon />
          </button>        </div>
        <h3>Mis clases hoy</h3>
        <div>
          <ClassList dayClases={classes} />
        </div>
      </div>
    </div>
  )
}
