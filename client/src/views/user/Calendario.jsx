import React, { useEffect, useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NavButtonList from '../../components/user/calendar/NavButtonList';
import EventWrapper from '../../components/user/calendar/EventWrapper';
import Modal from '../../components/user/calendar/Modal';
import DateCellWrapper from '../../components/user/calendar/DateCellWrapper';
import Month from '../../components/user/calendar/Month';
import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
    const [view, setView] = useState('month')
    const [date, setDate] = useState(new Date())
    const [events, setEvents] = useState([
        { title: 'Raul. M', level: 'A1-A2', start: new Date(), end: new Date() },
        { title: ' Maria. P', level: 'B1-B2', start: new Date(), end: new Date() },
        { title: ' Fernando. C', level: 'C1-C2', start: new Date(), end: new Date() }
    ])
    const [open, setOpen] = useState(false)
    const now = dayjs()

    const handleDate = (date, modal) => {
        return date.format(modal ? 'dddd D [-] MMMM [-] YYYY' : 'dddd DD [de] MMMM, YYYY - HH:mm [hs]')
            .split(' ')
            .map((item, index) => (index === 0 || index === 3 ? item.charAt(0).toUpperCase() + item.slice(1) : item))
            .join(' ')
    }

    const handleNavigate = (action, view) => {
        const newDate = action === 'PREV' ? dayjs(date).subtract(1, view).toDate()
            : action === 'NEXT' ? dayjs(date).add(1, view).toDate()
                : new Date()

        setDate(newDate)
    }

    const handleView = (newView) => {
        setView(newView)
    }

    // Formato días de la semana
    const formats = {
        dayFormat: (date, culture, localizer) => {
            const day = localizer.format(date, 'dd', culture).toUpperCase();
            const dateNum = localizer.format(date, 'D', culture);
            return `${day} ${dateNum}`;
        },
        weekdayFormat: (date, culture, localizer) => {
            const formattedDate = localizer.format(date, 'ddd', culture)
            return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1).slice(0, 2)
        }
    }

    const handleSelectSlot = (e) => {
        setDate(dayjs(e.start).toDate());
        setOpen(true);
    };

    return (
        <>
            <main className='flex flex-col gap-5 px-10'>
                <span className='text-sm self-end'>{handleDate(now)}</span>

                <Calendar
                    localizer={localizer}
                    date={date}
                    onNavigate={handleNavigate}
                    events={events}
                    formats={formats}
                    selectable={true}
                    views={['day', 'week', 'month']}
                    view={view}
                    onView={handleView}
                    onSelectSlot={handleSelectSlot}
                    className='min-h-screen cursor-pointer'
                    components={{
                        toolbar: () => (
                            <NavButtonList
                                onNavigate={handleNavigate}
                                onView={handleView}
                                today={handleDate(dayjs(date), true)}
                                view={view}
                            />
                        ),
                        eventWrapper: EventWrapper,
                        dateCellWrapper: DateCellWrapper,
                        month: {
                            header: ({ label }) => {
                                const formattedDate = dayjs(date).format('ddd').charAt(0).toUpperCase() + dayjs(date).format('ddd').slice(1, 3);
                                return (
                                    <Month label={label} date={formattedDate} />
                                )
                            },
                        },
                    }}
                />
            </main>

            <Modal open={open} setOpen={setOpen} onNavigate={handleNavigate} label={handleDate(dayjs(date), true)} />
        </>

    )
}
