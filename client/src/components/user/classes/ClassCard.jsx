import React from 'react';
import Options from './Options';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';

export default function ClassCard({ id, title, students, duration, isNow, linkMeet, toggleOptions, stateOption }) {

    const handleCardOptions = (e) => {
        e.stopPropagation();
        toggleOptions(id);
    };

    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className='relative border hover:border-Purple rounded-xl shadow-cardContainer p-4 flex justify-between flex-nowrap w-full text-card'>
            <div className='flex flex-col gap-4 w-7/12'>
                <h2 className='font-bold text-lg'>Programa 1</h2>
                <h3 className='font-semibold text-base truncate'>{title ? title : 'Sin titulo asignado'}</h3>
                <div className='flex flex-col gap-2 text-sm'>
                    <p className='flex items-center gap-2 truncate'><AccountCircleIcon /> {students.length ? students : 'Sin alumnos asignados'}</p>
                    <p className='flex items-center gap-2'><WatchLaterIcon />{duration}</p>
                </div>
            </div>

            <div className='flex flex-col justify-between items-end w-4/12'>
                <button
                    id={`button-Options-${id}`}
                    onClick={handleCardOptions}
                >
                    <MoreVertIcon />
                </button>

                <Link
                    to={isNow ? linkMeet : `/classroom/${id}`}
                    target={isNow ? '_blank' : ''}
                    className={`flex gap-2 rounded-lg px-2 py-2 font-extrabold ease-linear duration-200 ${isNow ? 'bg-yellowInput hover:bg-card hover:text-yellowInput' : 'bg-Purple text-white hover:bg-PurpleHover'}`}
                    onClick={handleLinkClick}
                >
                    {isNow ? <><VideocamIcon />Unirse</> : 'Programa'}
                </Link>
            </div>

            {stateOption === id && <Options state={stateOption} id={id} />}
        </div>
    );
}
