import React from 'react'

export default function ButtonModal({ buttonAction, type, label }) {
    const handleButton = () => {
        buttonAction()
    }

    return (
        <button
            type={`${type === 'prev' ? 'button' : type === 'submit' ? 'submit' : ''}`}
            className={`outline-none border rounded-lg py-3 lg:px-8 text-xl font-extrabold ease-out duration-600 tracking-wide ${type === 'prev' ? 'border-Purple text-Purple hover:bg-Purple hover:text-white hover:border-PurpleHover focus:border-PurpleHover' : 'border-Purple bg-Purple text-white hover:border-PurpleHover hover:bg-PurpleHover focus:border-PurpleHover'} whitespace-nowrap`}
            onClick={type === 'submit' ? undefined : handleButton}
        >
            {label}
        </button>
    )
}
