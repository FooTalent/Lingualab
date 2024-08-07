import React from 'react'

export default function InputField({ label, name, value, onChange, placeholder }) {
    return (
        <div className="flex flex-col gap-2 font-medium">
            <label className="p-0 text-custom">{label}</label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
                placeholder={placeholder}
            />
        </div>
    )
}
