import React, { useState } from 'react'
import Options from './Options'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';

export default function ClassCard({ title, level, students, resources, date }) {
    const [cardOptions, setCardOptions] = useState(false)

    const handleOptions = () => {
        setCardOptions(!cardOptions)
    }

    return (
        <div className='relative border hover:border-Purple rounded-xl shadow-cardContainer p-4 flex justify-between flex-nowrap w-full text-card'>
            <div className='flex flex-col gap-4 w-7/12'>
                <h2 className='font-bold text-lg'>{title} Programa 1</h2>
                <h3 className='font-semibold text-base'>{title} Programa 1</h3>

                <div className='flex flex-col gap-2 text-sm'>
                    <p className='flex items-center gap-2 text-ellipsis'><AccountCircleIcon /> {students}</p>
                    <p className='flex items-center gap-2'><WatchLaterIcon /> 18:00 - 19:00 hs</p>
                </div>

            </div>

            <div className='flex flex-col justify-between items-end w-3/12'>
                <button onClick={handleOptions}><MoreVertIcon /></button>

                <button className='flex gap-3 rounded-lg px-3 py-2 bg-yellow-300 font-extrabold'><VideocamIcon /> Unirse</button>
            </div>

            <Options state={cardOptions} />
        </div>
    )
}
