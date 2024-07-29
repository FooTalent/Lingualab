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
    <div className='fixed z-10 inset-0 flex items-center justify-center py-5'>
      <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
      <div className='p-6 bg-white rounded-2xl w-4/12 h-full z-10'>
        <div className='flex flex-col gap-4 px-4'>
          <button
            onClick={handleOpen}
            className='self-end text-Purple'
          >
            <CloseIcon fontWeight={'bold'} fontSize='medium'/>
          </button>
          <div className='flex justify-between items-center text-xl'>
            <button className='cursor-pointer' onClick={() => onNavigate('PREV', 'day')}>
              <KeyboardArrowLeftIcon fontSize='large' className='text-Purple' />
            </button>
            {label}
            <button className='cursor-pointer' onClick={() => onNavigate('NEXT', 'day')}>
              <KeyboardArrowRightIcon fontSize='large' className='text-Purple' />
            </button>        </div>
          <h3 className='text-xl font-medium'>Mis clases hoy</h3>
        </div>

        <div className='p-4 flex flex-col gap-6'>
          <ClassList dayClases={classes} />
        </div>
      </div>
    </div>
  )
}
