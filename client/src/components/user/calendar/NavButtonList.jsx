import React from 'react'
import NavButton from './NavButton'

export default function NavButtonList({ onNavigate, onView, label, view }) {
    const navButtons = [
        { label: 'Anterior', action: () => onNavigate('PREV') },
        { label: 'Siguiente', action: () => onNavigate('NEXT') },
        { label: 'Día', action: () => onView('day') },
        { label: 'Semana', action: () => onView('week') },
        { label: 'Mes', action: () => onView('month') },
    ]
    const adaptedLabel = (label.label).toUpperCase()

    return (
        <div className="flex justify-between items-center">
            <div className='flex gap-3 items-center'>
                {
                    navButtons.slice(0, 2).map((item, index) => (
                        <NavButton key={index} label={item.label} onClick={item.action} />
                    ))
                }
            </div>

            {view === 'day' ? adaptedLabel : ''}

            <div className='flex gap-3 items-center'>
                {
                    navButtons.slice(2).map((item, index) => (
                        <NavButton key={index} label={item.label} onClick={item.action} />
                    ))
                }
            </div>
        </div>
    )
}
