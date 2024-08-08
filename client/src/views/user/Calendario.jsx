import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { dayjsLocalizer } from 'react-big-calendar';
import ClassCalendar from '../../components/user/calendar/ClassCalendar';
import Modal from '../../components/user/calendar/Modal';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Toast } from '../../utils/toast';
import { getClassesByTeacherAndDate } from '../../services/programs.services'

dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
    const { user, userDetail } = useAppStore()
    const [classes, setClasses] = useState([])
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetchTeacherClasses()
    }, [])    

    const fetchTeacherClasses = async () => {
        // startDate=2024-07-01&endDate=2024-08-01
        const newClasses = await getClassesByTeacherAndDate(user.token, userDetail._id, '')
        if (!newClasses.isError) {
            setClasses(newClasses.data);
        } else {
            Toast.fire({
                title: 'No ha sido posible obtener las clases',
                icon: 'error'
            })
        }
    }

    const handleDate = (date) => {
        return dayjs(date).format('dddd D [-] MMMM [-] YYYY')
            .split(' ')
            .map((item, index) => (index === 0 || index === 3 ? item.charAt(0).toUpperCase() + item.slice(1) : item))
            .join(' ');
    };

    const handleNavigate = (action, view) => {
        const newDate = action === 'PREV' ? dayjs(date).subtract(1, view).toDate()
            : action === 'NEXT' ? dayjs(date).add(1, view).toDate()
                : new Date();
        setDate(newDate);
    };

    const handleSelectSlot = (e) => {
        setDate(dayjs(e.start).toDate());
        setOpen(true);
    };

    return (
        <>
            <main className='container mx-auto flex flex-col gap-5'>
                <ClassCalendar
                    localizer={localizer}
                    date={date}
                    handleNavigate={handleNavigate}
                    handleSelectSlot={handleSelectSlot}
                    handleDate={handleDate}
                    data={classes}
                />
            </main>

            <Modal
                open={open}
                setOpen={setOpen}
                onNavigate={handleNavigate}
                label={handleDate(date)}
                data={classes}
                selectedDay={date}
            />
        </>
    );
}
