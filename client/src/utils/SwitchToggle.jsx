import React from 'react'

export default function SwitchToggle() {
  return (
    <div className='flex justify-evenly'>
      <button
        className="bg-transparent hover:bg-PurpleHover text-zinc-800 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded transition-all duration-500 ease-in-out"
      >
        Alumno
      </button>
      <button
        className="bg-transparent hover:bg-PurpleHover text-zinc-800 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded transition-all duration-500 ease-in-out"
      >
        Profesor
      </button>
    </div>
  )
}
