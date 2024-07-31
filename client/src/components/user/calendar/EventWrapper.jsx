import React from 'react'
import Event from './Event'

export default function EventWrapper({ event }) {
    return (
        <div className='px-2 overflow-hidden'>
            <Event event={event} />
        </div>
    )
}
