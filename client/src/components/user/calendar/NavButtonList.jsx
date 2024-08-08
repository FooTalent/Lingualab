import React from 'react'
import NavButton from './NavButton'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function NavButtonList({ onNavigate, onView, today, view }) {
    const navButtons = [
        { label: <ArrowBackIosIcon fontSize='medium' />, action: () => onNavigate('PREV', view), },
        { label: <ArrowForwardIosIcon fontSize='medium' />, action: () => onNavigate('NEXT', view), },
        { label: 'Día', action: () => onView('day')},
        { label: 'Semana', action: () => onView('week')},
        { label: 'Mes', action: () => onView('month')},
    ]

    return (
        <div className="flex justify-between items-center mb-6">
            <div className='flex items-center gap-2'>
                <NavButton label={navButtons[0].label} onClick={navButtons[0].action} icon={navButtons[0].icon} />
                <span className='font-medium text-xl'>{today}</span>
                <NavButton label={navButtons[1].label} onClick={navButtons[1].action} icon={navButtons[1].icon} />
            </div>

            <div className='flex items-center'>
                {
                    navButtons.slice(2).map((item, index) => (
                        <NavButton key={index} label={item.label} onClick={item.action} icon={item.icon} />
                    ))
                }
            </div>
        </div>
    )
}
