import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './customCalendar.css';

export default function UserCalendar() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDayClick = (value) => {
        setSelectedDate(value);
    };

    const checkCondition = (date) => {
        return true;
    };

    const handleDayClass = ({ date }) => {
        let dayClasses = ' ';

        if (date.toDateString() === selectedDate.toDateString()) {
            dayClasses += ' selected-day';
        }
        if (checkCondition(date)) {
            dayClasses += 'condition-day';
        }
        if (date.getDay() === 0 || date.getMonth() !== selectedDate.getMonth()) {
            dayClasses += ' !text-zinc-300';
        }
        if (date.toDateString() === new Date().toDateString()) {
            dayClasses += ' today';
        }
        return dayClasses;
    }

    return (
        <div className="w-full flex justify-center">
            <Calendar
                calendarType='gregory'
                className={'customCalendar !border-0 !w-full'}
                // onClickDay={handleDayClick}
                tileClassName={handleDayClass}
                formatShortWeekday={(locale, date) => ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'][date.getDay()]}
            />
        </div>
    );
}
