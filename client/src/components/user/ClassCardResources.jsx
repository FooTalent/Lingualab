import React from 'react'

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
            >
                Recursos de esta clase
            </label>
        </div>
    )
}
