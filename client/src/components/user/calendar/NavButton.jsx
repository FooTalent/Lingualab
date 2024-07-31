import React from 'react'

export default function NavButton({ label, onClick }) {
    return (
        <button
            className={`text-Purple text-xl ${typeof (label) === 'string' ? 'hover:bg-Purple hover:text-white border-2 border-Purple py-1 px-4' : ''} ${label === 'Día' ? 'border-r-0 rounded-s-md' : label === 'Mes' ? 'border-s-0 rounded-e-md' : ''} `}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
