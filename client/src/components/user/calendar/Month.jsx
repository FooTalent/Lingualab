import React from 'react'

export default function Month({ label, date, view }) {
    const isToday = label === date

    return (
        <div className={`w-full ease-out duration-600 py-5 !px-0 text-xl font-medium text-Purple border-0
        ${isToday && view === 'month' ? 'text-card bg-yellowInput scale-x-110 md:scale-x-105' : ''} `}
        >
            {label}
        </div>
    )
}
