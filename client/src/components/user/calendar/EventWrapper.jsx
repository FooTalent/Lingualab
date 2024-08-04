import React from 'react'
import Event from './Event'

export default function EventWrapper({ event }) {
    return (
        <div className='px-1'>
            <Event event={event} />
        </div>
    )
}
