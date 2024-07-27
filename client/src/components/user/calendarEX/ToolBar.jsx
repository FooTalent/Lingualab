import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function ToolBar({ selectedDate, isToday, monthName }) {
    return (
        <div className="flex justify-between rounded-xl shadow-calendar py-6 px-4 text-lg">
            <div className='flex gap-1 w-5/12'>
                <button className='w-1/4'><ArrowBackIosNewIcon /></button>
                <button
                    className={`w-full px-4 py-3 bg-Purple text-white font-bold text-md rounded-md`}
                >
                    {isToday(selectedDate) ? 'HOY' : selectedDate.getDate()}
                </button>
                <button className='w-1/4'><ArrowForwardIosIcon /></button>
            </div>

            <div className='flex items-center px-2 py-3'>
                <button
                    className={`font-bold text-md rounded-md`}
                >
                    {monthName.toUpperCase(0)}
                </button>
                <KeyboardArrowDownIcon style={{'font-size': '35px'}} />
            </div>

            <button
                className={`px-4 py-3 font-bold text-md rounded-md`}
            >
                {selectedDate.getFullYear()}
            </button>
        </div>
    )
}
