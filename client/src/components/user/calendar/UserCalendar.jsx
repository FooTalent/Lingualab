import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import ToolBar from './ToolBar';
import './userCalendar.css'
import Day from './Day'

const localizer = momentLocalizer(moment);

export default function UserCalendar({ props }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthName, setMonthName] = useState('');
    const [events, setEvents] = useState([])
    const options = { month: 'long' };

    // Cambia el número de mes a texto para setearlo en toolbar
    useEffect(() => {
        const newMonth = new Intl.DateTimeFormat('es-ES', options).format(selectedDate);
        setMonthName(newMonth);
    }, [selectedDate]);

    // Setea los eventos
    useEffect(() => {
        const initialEvents = [
            {
                title: 'Clase 1',
                start: new Date(2024, 6, 23, 10, 0),
                end: new Date(2024, 6, 23, 11, 0)
            },
            {
                title: 'Clase 1',
                start: new Date(2024, 6, 5, 10, 0),
                end: new Date(2024, 6, 5, 11, 0)
            },
            {
                title: 'Clase 1',
                start: new Date(2024, 6, 10, 10, 0),
                end: new Date(2024, 6, 10, 11, 0)
            }
        ]

        setEvents(initialEvents)
    }, [])

    const handleNavigate = (date) => {
        setSelectedDate(date);
    };

    const isToday = (date) => {
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    };

    // Formato de días de la semana (DO, LU, MA, etc.)
    const formats = {
        weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dd', culture).toUpperCase(),
    }

    const eventPropGetter = () => {
        return {
            style: { display: 'none' },
        };
    };

    const checkEventForDate = (date) => {
        const isSameDay = (date1, date2) => moment(date1).isSame(date2, 'day');
        const hasEvent = events.some((event) => isSameDay(event.start, date));
        const isSelected = isSameDay(selectedDate, date);

        return { hasEvent, isSelected };
    };

    return (
        <Calendar
            localizer={localizer}
            onView={'month'}
            onNavigate={(handleNavigate)}
            className={'!p-0 flex flex-col gap-16 mt-8 min-h-36'}
            formats={formats}
            date={selectedDate}
            events={events}
            eventPropGetter={eventPropGetter}
            components={{
                toolbar: () => (
                    <ToolBar selectedDate={selectedDate} isToday={isToday} monthName={monthName} />
                ),
                month: {
                    header: ({ label }) => (
                        <div>
                            {label}
                        </div>
                    ),
                    dateHeader: ({ date, label }) => (
                        <Day date={date} label={label} checkEvent={checkEventForDate(date)} setDate={setSelectedDate} />
                    )
                }
            }}
        />
    );
}
