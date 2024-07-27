import React from 'react'

export default function NavButton({ label }) {
    return (
        <button onClick={() => onNavigate('PREV')}>{label}</button>
    )
}
