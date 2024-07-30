import React from 'react'

export default function Event({ event }) {
    let { title } = event

    return (
        <div className='flex items-center gap-2 truncate'>
            <span className='w-3 h-3 bg-green-500 rounded-full'></span>
            <p className='text-sm'>{title}</p>
        </div>
    )
}
