import React from 'react'

export default function NavButton({ label, onClick }) {
    return (
        <button
            onClick={onClick}
        >
            {label}
        </button>
    )
}
