import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useEffect, useState } from 'react';
import moment from 'moment'
import 'moment/locale/es'

moment.locale('es')
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
            onNavigate={handleNavigate}
            className={'!p-0 flex flex-col gap-16 mt-8'}
            formats={formats}
            date={selectedDate}
            components={{
                toolbar: () => (
                    <div className="flex justify-center gap-8 rounded-xl shadow-calendar py-6 px-4">
                        <button
                            className={`px-4 py-3 bg-Purple text-white font-bold text-md rounded-md`}
                        >
                            {isToday(selectedDate) ? 'HOY' : selectedDate.getDate()}
                        </button>
                        <button
                            className={`px-4 py-3 bg-Purple text-white font-bold text-md rounded-md`}
                        >
                            {monthName.toUpperCase()}
                        </button>
                        <button
                            className={`px-4 py-3 bg-Purple text-white font-bold text-md rounded-md`}
                        >
                            {selectedDate.getFullYear()}
                        </button>
                    </div>
                ),
                header: ({ label }) => (
                    <div className="">
                        {label}
                    </div>
                ),
                month: {
                    dateHeader: ({ date, label }) => (
                        <button
                            className="px-2 py-1"
                            onClick={() => {
                                setSelectedDate(date);
                            }}
                        >
                            {label}
                        </button>
                    )
                }
            }}
            dayPropGetter={(date) => {
                return {
                    className: 'p-3 bg-gray-100 border border-gray-200'
                };
            }}
            eventPropGetter={(event) => {
                return {
                    className: 'bg-purple-500 text-white p-2 rounded-md'
                };
            }}
        />
    );
}
