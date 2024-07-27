import React, { useState } from 'react'
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NavButtonList from '../../components/user/calendar/NavButtonList';
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import EventList from '../../components/user/calendar/EventList';

dayjs.locale('es')
const localizer = dayjsLocalizer(dayjs);

export default function Calendario() {
    const [view, setView] = useState('month')
    const [date, setDate] = useState(new Date())
    const now = dayjs()

    const handleDate = (date) => {
        const formatDate = date.format('dddd DD [de] MMMM, YYYY - HH:mm [hs]').split(' ')
        let adaptedDate = formatDate.map((item, index) => {
            return index === 0 || index === 3
                ? item.charAt(0).toUpperCase() + item.slice(1)
                : item
        })

        return adaptedDate.join(' ')
    }

    const handleNavigate = (action) => {
        const newDate = action === 'PREV' ? dayjs(date).subtract(1, view).toDate()
            : action === 'NEXT' ? dayjs(date).add(1, view).toDate()
                : new Date()

        setDate(newDate)
    }

    const handleView = (newView) => {
        setView(newView)
    }

    const events = [
        {
            title: 'Prueba 1',
            start: new Date(),
            end: new Date()
        },
        {
            title: 'Prueba 2',
            start: new Date(),
            end: new Date()
        },
        {
            title: 'Prueba 3',
            start: new Date(),
            end: new Date()
        },
    ]

    return (
        <main className='relative py-8 px-10'>
            <span className='absolute top-0 right-6'>{handleDate(now)}</span>

            <Calendar
                localizer={localizer}
                views={['day', 'week', 'month']}
                date={date}
                events={events}
                onView={'month'}
                view={view}
                onNavigate={(newDate) => setDate(newDate)}
                className='min-h-screen'
                components={{
                    toolbar: (label) => (
                        < NavButtonList
                            onNavigate={handleNavigate}
                            onView={handleView}
                            label={label}
                            view={view}
                        />
                    ),
                    event: () => (
                        <EventList events={events} />
                    )
                }}
            />
        </main>
    )
}
