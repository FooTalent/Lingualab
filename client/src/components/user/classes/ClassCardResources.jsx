import React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function ClassCardResources({ handleResources, state }) {
    return (
        <div>
            <input
                id="resourcesCollapse"
                defaultChecked={state}
                type="checkbox"
                className="peer sr-only"
            />
            <label
                htmlFor="resourcesCollapse"
                onClick={() => handleResources(state)}
                className='text-base p-0 font-normal flex items-center gap-2'
            >
                <ArrowForwardIosIcon className='icon' />
                Recursos de esta clase
            </label>
        </div>
    )
}
