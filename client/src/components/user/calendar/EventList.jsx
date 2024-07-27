import React from 'react'
import Event from './Event'

export default function EventList({ events }) {
  return (
    events.map((event, index) => {
        return(
            <Event 
                key={index}
                event={event}
            />
        )
    })
  )
}
