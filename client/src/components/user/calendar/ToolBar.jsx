import React from 'react'

export default function ToolBar({ selectedDate, isToday, monthName }) {
    return (
        <div className="flex justify-center gap-8 rounded-xl shadow-calendar py-6 px-4">
            <button
                className={`px-4 py-3 bg-Purple text-white font-bold text-md rounded-md`}
            >
                {isToday(selectedDate) ? 'HOY' : selectedDate.getDate()}
            </button>
            <button
                className={`px-4 py-3 bg-Purple text-white font-bold text-md rounded-md`}
            >
                {monthName.toUpperCase()}
            </button>
            <button
                className={`px-4 py-3 bg-Purple text-white font-bold text-md rounded-md`}
            >
                {selectedDate.getFullYear()}
            </button>
        </div>
    )
}
