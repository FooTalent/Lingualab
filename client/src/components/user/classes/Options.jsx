import React from 'react'
import { Link } from 'react-router-dom'

export default function Options({ state, id, links }) {
    return (
        <div
            className={`absolute top-1/4 end-0 text-sm border shadow-cardContainer z-10 rounded-lg bg-white p-4 ${state ? 'flex flex-col gap-4' : 'hidden'}`}
        >
            {
                links.map((link, index) => (
                    <Link
                        key={`${index}-${id}`}
                        to={link.path}
                        className='cursor-pointer py-1 px-2 rounded-md ease-linear duration-200 flex items-center gap-2 !text-card !no-underline hover:bg-yellowInput'
                    >
                        {link.label}
                    </Link>
                ))
            }
        </div>
    )
}
