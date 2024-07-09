import React from 'react'

export default function SwitchToggle() {
  return (
    <label htmlFor="check" className='relative bg-gray-100 w-28 h-14 rounded-full'>
      <input type="checkbox" id="check" className='sr-only peer' />
      <span className='w-2/5 h-4/5 bg-rose-300 absolute rounded-full left-1 top-1 peer-checked:bg-rose-600 peer-checked:left-11 transition-all duration-500'></span>
    </label>
  )
}
