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
import Spinner from '../../Spinner/Spinner'

export default function ClassCard({ id, title, students, duration, date, program, toggleOptions, stateOption, openModalDelete, openModalInvite }) {
    const { user } = useAppStore()
    const [stringStudents, setStringStudents] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const links = [
        { function: () => openModalInvite(program._id), label: <><PersonAddIcon /> Invitar estudiante/s:</>, disabled: false },
        { path: `/aulavirtual/aula/${program._id}`, label: <><WatchLaterIcon /> Editar fecha y hora</>, disabled: false },
        { path: `/classroom/${id}`, label: <><ShareIcon /> Compartir</>, disabled: true },
        { function: () => openModalDelete(id), label: <><DeleteIcon /> Eliminar clase</>, disabled: false },
    ]

    useEffect(() => {
        setIsLoading(true)
        try {
            handleStudents()
        } catch (error) {
            console.error(error)
        }
        setIsLoading(false)
    }, [students]);

    const handleStudents = async () => {
        if (students.length < 1) {
            setStringStudents('-')
        }

        let newStudents = []
        for (let student of students) {
            let fetchUser = await getStudentsById(user.token, student._id);
            fetchUser.data.map(newStudent => {
                newStudents.push(`${newStudent.last_name}, ${newStudent.first_name}`);
            })
        }
        if (newStudents.length > 0) {
            setStringStudents(newStudents)
        }
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

    if (isLoading || !stringStudents) return <Spinner />

    return (
        <>
            <div className={`relative border-2 border-white hover:border-Purple rounded-xl shadow-cardContainer p-4 flex flex-nowrap w-full text-card ease-out duration-600 md:min-h-40`}>
                <div className='flex flex-col gap-4 w-8/12'>
                    <h2 className='font-extrabold text-lg leading-5'>{title}</h2>
                    <div className='flex flex-col gap-2'>
                        <p className='flex py-1 gap-2 items-center truncate w-full whitespace-nowrap leading-4'>
                            <span className='font-semibold whitespace-normal'>Estudiante/s:</span>
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
                </div><div className='flex flex-col justify-between items-end w-fit'>
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
                        className={`flex gap-2 items-center rounded-lg px-4 py-[10px] font-extrabold ease-out duration-300 truncate whitespace-nowrap ${isNow ? 'bg-yellowInput hover:bg-card hover:text-yellowInput' : 'bg-Purple text-white hover:bg-PurpleHover'}`}
                        onClick={handleLinkClick}
                    >
                        {isNow ? <><VideocamIcon />Unirse</> : 'Ir al aula'}
                    </Link>
                </div>
                {stateOption === id && <Options state={stateOption} id={id} links={links} positionTop={'27%'} />}
            </div >
        </>
    );
}
