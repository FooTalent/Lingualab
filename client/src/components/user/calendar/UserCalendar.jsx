import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import ToolBar from './ToolBar';

const localizer = momentLocalizer(moment);

export default function UserCalendar({ props }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [monthName, setMonthName] = useState('');
    const options = { month: 'long' };

    useEffect(() => {
        const newMonth = new Intl.DateTimeFormat('es-ES', options).format(selectedDate);
        setMonthName(newMonth);
    }, [selectedDate]);

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

    const formats = {
        weekdayFormat: (date, culture, localizer) =>
            localizer.format(date, 'dd', culture).toUpperCase(),
    }

    return (
        <Calendar
            localizer={localizer}
            onView={'month'}
            onNavigate={(handleNavigate)}
            className={'!p-0 flex flex-col gap-16 mt-8 min-h-1'}
            formats={formats}
            date={selectedDate}
            components={{
                toolbar: () => (
                    <ToolBar selectedDate={selectedDate} isToday={isToday} monthName={monthName} />
                ),
                month: {
                    header: ({ label }) => (
                        <div className=''>
                            {label}
                        </div>
                    ),
                    dateHeader: ({ date, label }) => (
                        <button
                            className="px-2 py-1 bg-yellow-300"
                            onClick={() => {
                                setSelectedDate(date);
                            }}
                        >
                            {label}
                        </button>
                    )
                }
            }}
        />
    );
}
