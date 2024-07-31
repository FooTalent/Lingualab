import React, { useState } from 'react';
import NavButtonList from './NavButtonList';
import EventWrapper from './EventWrapper';
import DateCellWrapper from './DateCellWrapper';
import Month from './Month';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';

export default function ClassCalendar({ localizer, date, handleNavigate, handleSelectSlot, events, handleDate }) {
    const [view, setView] = useState('month');

    const handleView = (newView) => {
        setView(newView);
    };

    // Formato días de la semana
    const formats = {
        dayFormat: (date, culture, localizer) => {
            const day = localizer.format(date, 'dd', culture).toUpperCase();
            const dateNum = localizer.format(date, 'D', culture);
            return `${day} ${dateNum}`;
        },
        weekdayFormat: (date, culture, localizer) => {
            const formattedDate = localizer.format(date, 'ddd', culture);
            return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1, 3);
        }
    };

    return (
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
                        today={handleDate(date)}
                        view={view}
                    />
                ),
                eventWrapper: EventWrapper,
                dateCellWrapper: DateCellWrapper,
                month: {
                    header: ({ label }) => {
                        const formattedDate = dayjs(date).format('dddd').slice(0, 2).charAt(0).toUpperCase() + dayjs(date).format('dddd').slice(1, 3);
                        return (
                            <Month label={label} date={formattedDate} />
                        );
                    },
                },
            }}
        />
    );
}
