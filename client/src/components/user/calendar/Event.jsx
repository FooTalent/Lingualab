import React from 'react'

export default function Event({ event }) {
    let { title, start, end } = event

    return (
        <div>{title}</div>
    )
}
