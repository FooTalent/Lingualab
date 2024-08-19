import React, { useState } from 'react';
import NavButtonList from './NavButtonList';
import EventWrapper from './EventWrapper';
import DateCellWrapper from './DateCellWrapper';
import Month from './Month';
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import EventContainerWrapper from './EventContainerWrapper';

export default function ClassCalendar({ localizer, date, handleNavigate, handleSelectSlot, handleDate, data }) {
    const [view, setView] = useState('month');

    const handleView = (newView) => {
        setView(newView);
    };

    const handleEvents = (classes) => {
        let newEvents = [];

        classes.forEach(item => {
            if (item.title && item.daytime) {
                const start = new Date(item.daytime)
                const end = new Date(start)
                end.setHours(start.getHours() + 1)

                newEvents.push({
                    title: item.title,
                    start: start,
                    end: end,
                    level: item.level
                });
            }
        });

        return newEvents;
    }

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
        <>
            <NavButtonList
                onNavigate={handleNavigate}
                onView={handleView}
                today={handleDate(date)}
                view={view}
            />

            <Calendar
                localizer={localizer}
                date={date}
                onNavigate={handleNavigate}
                events={handleEvents(data)}
                onSelectSlot={handleSelectSlot}
                formats={formats}
                toolbar={false}
                selectable={true}
                views={['day', 'week', 'month']}
                view={view}
                onView={handleView}
                className='min-h-screen border border-Grey rounded-lg cursor-pointer overflow-hidden'
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
        </>

    );
}
