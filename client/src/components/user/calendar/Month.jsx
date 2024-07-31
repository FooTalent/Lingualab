import React from 'react'

export default function Month({ label, date }) {
    return (
        <div className={`${label === date ? 'text-card bg-yellowInput scale-x-105' : ''} py-5 text-xl font-medium text-Purple`}>
            {label}
        </div>
    )
}
