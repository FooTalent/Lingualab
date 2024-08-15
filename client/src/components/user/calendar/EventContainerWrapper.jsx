import React from 'react'

export default function EventContainerWrapper({ children, view }) {
    const baseClass = view === 'week' ? 'rbc-events-container' : '';

    return (
        <div className={`${baseClass} hover:bg-Yellow ease-out duration-600 !m-0`}>
            {children}
        </div>
    )
}
