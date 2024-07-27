import React from 'react'

export default function ToolBar({ date, label, checkEvent, setDate }) {
    const { hasEvent, isSelected } = checkEvent;
    return (
        <>
            <button
                onClick={() => {
                    setDate(date);
                }}
            >
                {label}

            </button>
            {hasEvent && !isSelected && <span className="event-indicator"></span>}
        </>
    )
}
