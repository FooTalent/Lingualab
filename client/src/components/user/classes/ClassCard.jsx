import React, { useEffect, useState } from 'react';
import Options from './Options';
import { Link } from 'react-router-dom';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { getStudentsById } from '../../../services/students.services';
import { useAppStore } from '../../../store/useAppStore';

export default function ClassCard({ id, title, students, duration, date, program, toggleOptions, stateOption, openModalDelete, openModalInvite }) {
    const { user } = useAppStore()
    const [stringStudents, setStringStudents] = useState('-');
    const links = [
        { function: () => openModalInvite(id), label: <><PersonAddIcon /> Invitar al/los alumno/s</> },
        { path: `/aulavirtual/aula/${program._id}`, label: <><WatchLaterIcon /> Editar fecha y hora</> },
        { path: `/classroom/${id}`, label: <><ShareIcon /> Compartir</> },
        { function: () => openModalDelete(id), label: <><DeleteIcon /> Eliminar clase</> },
    ]

    useEffect(() => {
        try {
            handleStudents()
        } catch (error) {
            console.log(error)
        }
    }, [students]);

    const handleStudents = async () => {
        if (!students.length) return '-';

        let newStudents = []
        for (let student of students) {
            let fetchUser = await getStudentsById(user.token, student);
            fetchUser.data.map(newStudent => {
                newStudents.push(`${newStudent.last_name}, ${newStudent.first_name}`);
            })
        }

        setStringStudents(newStudents)
    }

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
        <>
            <div className='relative border-2 border-white hover:border-Purple rounded-xl shadow-cardContainer p-4 flex justify-between flex-nowrap w-full text-card ease-out duration-600'>
                <div className='flex flex-col gap-4 w-8/12'>
                    <h2 className='font-extrabold text-lg leading-5'>{title}</h2>
                    <div className='flex flex-col gap-2'>
                        <p className='flex py-1 gap-2 items-center truncate w-full whitespace-nowrap leading-4'>
                            <span className='font-semibold whitespace-normal'>Estudiante/s: </span>
                            <span className='truncate'>{stringStudents}</span>
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
                        to={isNow ? '' : `/aulavirtual/aula/${program._id}`}
                        target={isNow ? '_blank' : ''}
                        className={`flex gap-2 rounded-lg px-2 py-2 font-extrabold ease-out duration-600 ${isNow ? 'bg-yellowInput hover:bg-card hover:text-yellowInput' : 'bg-Purple text-white hover:bg-PurpleHover'}`}
                        onClick={handleLinkClick}
                    >
                        {isNow ? <><VideocamIcon />Unirse</> : 'Ir al aula'}
                    </Link>
                </div>

                {stateOption === id && <Options state={stateOption} id={id} links={links} />}
            </div>


        </>
    );
}
