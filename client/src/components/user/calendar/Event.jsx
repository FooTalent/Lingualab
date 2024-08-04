import React from 'react';

export default function Event({ event }) {
    const { title, level } = event;

    return (
        <div className='top 0 flex items-center gap-2'>
            <span className={`w-3 h-3 rounded-full ${level === 'A1-A2' ? 'bg-a1a2' : level === 'B1-B2' ? 'bg-b1b2' : level === 'C1-C2' ? 'bg-c1c2' : ''}`}></span>
            <p className='text-sm truncate w-10/12'>
                <span>{level} </span>
                {title}
            </p>
        </div>
    );
}
