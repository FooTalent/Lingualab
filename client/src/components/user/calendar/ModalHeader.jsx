import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

export default function ModalHeader({ handleOpen, label, onNavigate }) {
    return (
        <div className='flex flex-col gap-4 px-4 h-2/6'>
            <button
                onClick={handleOpen}
                className='self-end text-Purple'
            >
                <CloseIcon fontWeight={'bold'} fontSize='medium' />
            </button>
            <div className='flex justify-between items-center clases-center text-xl'>
                <button className='cursor-pointer' onClick={() => onNavigate('PREV', 'day')}>
                    <KeyboardArrowLeftIcon fontSize='large' className='text-Purple' />
                </button>
                {label}
                <button className='cursor-pointer' onClick={() => onNavigate('NEXT', 'day')}>
                    <KeyboardArrowRightIcon fontSize='large' className='text-Purple' />
                </button>        </div>
            <h3 className='text-xl font-medium'>Mis clases hoy</h3>
        </div>
    )
}
