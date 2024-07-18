import React from 'react'

export default function ClassCardResources({ handleResources, state }) {
    return (
        <div>
            <button onClick={() => handleResources(state)}>Recursos de esta clase</button>
        </div>
    )
}
