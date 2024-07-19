import React, { useState } from 'react'
import Calendar from 'react-calendar';

export default function UserCalendar() {
    const [startDate, setStartDate] = useState(new Date())

    return (
        <div>
            <Calendar
                activeStartDate={startDate}
                onChange={setStartDate}
                value={startDate}
                calendarType='gregory'
                className='border-2 border-yellow-300 rounded-xl p-6'
                showNavigation={false}
                onClickDay={(value, event) => console.log('Clicked day: ', value)}
                tileClassName={''}
            />
        </div>

    )
}
