import React from 'react';
import Options from './Options';
import { Link } from 'react-router-dom';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

export default function ClassCard({ id, title, students, duration, date, program, toggleOptions, stateOption }) {
    const links = [
        { path: `/classroom/${id}`, label: <><PersonAddIcon /> Invitar al/los alumno/s</> },
        { path: `/aulavirtual/aula/${program._id}`, label: <><WatchLaterIcon /> Editar fecha y hora</> },
        { path: `/classroom/${id}`, label: <><ShareIcon /> Compartir</> },
        { path: `/classroom/${id}`, label: <><DeleteIcon /> Eliminar clase</> },
    ]

    const handleStudents = () => {
        if (students.length) return '-';
        return students.map(persona => `${persona.lastName} ${persona.firstName}`).join(', ');
    }

    const stringStudents = handleStudents()

    const checkIsNow = () => {
        let now = new Date();
        let newDate = new Date(date);

        let isSameDay = now.toDateString() === newDate.toDateString();

        let diffInMinutes = (newDate - now) / 60000;

        if (isSameDay && diffInMinutes >= -15 && diffInMinutes <= 60) {
            return true;
        } else {
            return false;
        }
    }

    const isNow = checkIsNow()

    const handleCardOptions = (e) => {
        e.stopPropagation();
        toggleOptions(id);
    };

    const handleLinkClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className='relative border-2 border-white hover:border-Purple rounded-xl shadow-cardContainer p-4 flex justify-between flex-nowrap w-full text-card ease-out duration-600'>
            <div className='flex flex-col gap-4 w-8/12'>
                <h2 className='font-extrabold text-lg leading-5'>{title}</h2>
                <div className='flex flex-col gap-2'>
                    <p className='flex py-1 gap-2 whitespace-nowrap items-center truncate leading-4'>
                        <span className='font-semibold'>Alumno: </span>
                        {stringStudents}
                    </p>
                    <p className='flex py-1 gap-2 whitespace-nowrap items-center truncate leading-4'>
                        <span className='font-semibold'>Fecha de inicio: </span>
                        {dayjs(date).format('YYYY-MM-DD')}
                    </p>
                    <p className='flex py-1 gap-2 whitespace-nowrap items-center truncate leading-4'>
                        <span className='font-semibold'>Hora: </span>
                        {duration}
                    </p>
                </div>
            </div>

            <div className='flex flex-col justify-between items-end w-4/12'>
                <button
                    id={`button-Options-${id}`}
                    className='text-Purple'
                    onClick={handleCardOptions}
                >
                    <MoreVertIcon />
                </button>

                <Link
                    to={isNow ? '' : `/classroom/${id}`}
                    target={isNow ? '_blank' : ''}
                    className={`flex gap-2 rounded-lg px-2 py-2 font-extrabold ease-out duration-600 ${isNow ? 'bg-yellowInput hover:bg-card hover:text-yellowInput' : 'bg-Purple text-white hover:bg-PurpleHover'}`}
                    onClick={handleLinkClick}
                >
                    {isNow ? <><VideocamIcon />Unirse</> : 'Ir al aula'}
                </Link>
            </div>

            {stateOption === id && <Options state={stateOption} id={id} links={links} />}
        </div>
    );
}
