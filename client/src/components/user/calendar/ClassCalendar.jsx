import React, { useState } from 'react';
import NavButtonList from './NavButtonList';
import EventWrapper from './EventWrapper';
import DateCellWrapper from './DateCellWrapper';
import Month from './Month';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import EventContainerWrapper from './EventContainerWrapper';
import './Calendar.css';

export default function ClassCalendar({ localizer, date, handleNavigate, handleSelectSlot, handleDate, data }) {
    const [view, setView] = useState('month');

    const events = data.map(item => ({
        title: item.title,
        start: new Date(item.daytime),
        end: new Date(new Date(item.daytime).setHours(new Date(item.daytime).getHours() + 1)),
        level: item.level,
    }));

    const formatDay = (date, culture) => {
        const day = localizer.format(date, 'ddd', culture);
        return day.charAt(0).toUpperCase() + day.slice(1, 3);
    };

    const formats = {
        dayFormat: formatDay,
        weekdayFormat: formatDay,
    };

    return (
        <>
            <NavButtonList
                onNavigate={handleNavigate}
                onView={setView}
                today={handleDate(date)}
                view={view}
            />

            <Calendar
                localizer={localizer}
                date={date}
                onNavigate={handleNavigate}
                events={events}
                onSelectSlot={handleSelectSlot}
                formats={formats}
                toolbar={false}
                selectable={true}
                views={['day', 'week', 'month']}
                view={view}
                onView={setView}
                className={`min-h-screen border border-Grey rounded-lg cursor-pointer overflow-hidden 
                    ${view !== 'month' ? 'hide-all-day' : ''}`}
                components={{
                    eventWrapper: EventWrapper,
                    dateCellWrapper: ({ children }) => (
                        <DateCellWrapper view={view}>
                            {children}
                        </DateCellWrapper>
                    ),
                    eventContainerWrapper: ({ children }) => (
                        <EventContainerWrapper view={view}>
                            {children}
                        </EventContainerWrapper>
                    ),
                    header: ({ label }) => {
                        const formattedDate = dayjs(date).format('dddd').slice(0, 2).charAt(0).toUpperCase() + dayjs(date).format('dddd').slice(1, 3);
                        return <Month label={label} date={formattedDate} view={view} />;
                    },
                }}
            />
        </>
    );
}
