import React, { useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NavButtonList from '../../components/user/calendar/NavButtonList';
import EventWrapper from '../../components/user/calendar/EventWrapper';
import Modal from '../../components/user/calendar/Modal';
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
    const [view, setView] = useState('month')
    const [date, setDate] = useState(new Date())
    const [events, setEvents] = useState([{ title: 'Prueba', start: new Date(), end: new Date() }])
    const [open, setOpen] = useState(false)
    const now = dayjs()

    const handleDate = (date, modal) => {
        return date.format(modal ? 'dddd D [-] MMMM [-] YYYY' : 'dddd DD [de] MMMM, YYYY - HH:mm [hs]')
            .split(' ')
            .map((item, index) => (index === 0 || index === 3 ? item.charAt(0).toUpperCase() + item.slice(1) : item))
            .join(' ')
    }

    const handleNavigate = (action, condition) => {
        let newDate
        !condition
            ? newDate = action === 'PREV' ? dayjs(date).subtract(1, view).toDate()
                : action === 'NEXT' ? dayjs(date).add(1, view).toDate()
                    : new Date()

            : newDate = action === 'PREV' ? dayjs(date).subtract(1, 'day').toDate()
                : action === 'NEXT' ? dayjs(date).add(1, 'day').toDate()
                    : new Date()

        setDate(newDate)
    }

    const handleView = (newView) => {
        setView(newView)
    }

    const formats = {
        dayFormat: (date, culture, localizer) => {
            const day = localizer.format(date, 'dd', culture).toUpperCase();
            const dateNum = localizer.format(date, 'D', culture);
            return `${day} ${dateNum}`;
        },
        weekdayFormat: (date, culture, localizer) => localizer.format(date, 'ddd', culture).toUpperCase().slice(0, 2)
    }

    const handleSelectSlot = (e) => {
        setOpen(true);
        setDate(e.start);
    };

    return (
        <>
            <main className='relative py-8 px-10'>
                <span className='absolute top-0 right-6'>{handleDate(now)}</span>

                <Calendar
                    localizer={localizer}
                    events={events}
                    formats={formats}
                    selectable={true}
                    views={['day', 'week', 'month']}
                    view={view}
                    onView={handleView}
                    onSelectSlot={handleSelectSlot}
                    className='min-h-screen cursor-pointer'
                    components={{
                        toolbar: (label) => (
                            <NavButtonList
                                onNavigate={handleNavigate}
                                onView={handleView}
                                label={label}
                                view={view}
                            />
                        ),
                        eventWrapper: EventWrapper,
                    }}
                />
            </main>

            <Modal open={open} setOpen={setOpen} onNavigate={handleNavigate} label={handleDate(dayjs(date), true)} />
        </>

    )
}
