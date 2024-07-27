import React, { Children, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import NavButtonList from '../../components/user/calendar/NavButtonList';
import moment from 'moment'

moment.updateLocale('es')
console.log(moment())
const localizer = momentLocalizer(moment);

export default function Calendario() {
    const [view, setView] = useState('month')
    const [date, setDate] = useState(new Date())
    const fecha = moment()

    const handleNavigate = (action) => {
        const newDate = action === 'PREV' ? moment(date).subtract(1, view).toDate()
            : action === 'NEXT' ? moment(date).add(1, view).toDate()
                : new Date()

        setDate(newDate)
    }

    const handleView = (newView) => {
        setView(newView)
    }

    return (
        <main className='relative py-8 px-10'>
            <span className='absolute top-0 right-6'>{fecha.format('dddd D [de] MMMM, YYYY - HH:mm [hs]')}</span>

            <Calendar
                localizer={localizer}
                views={['day', 'week', 'month']}
                date={date}
                onView={view}
                onNavigate={(newDate) => setDate(newDate)}
                className='min-h-screen'
                components={{
                    toolbar: (onNavigate, onView) => {
                        return (
                            < NavButtonList
                                onNavigate={handleNavigate}
                                onView={handleView}
                            />
                        )
                    },
                }}
            />
        </main>
    )
}
