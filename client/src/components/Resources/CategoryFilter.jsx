import { useState } from "react"

export default function CategoryFilter({onClick, resource}) {

  const [isSelected, setIsSelected] = useState('false')

  const handleFilter = () => {
    onClick()
    setIsSelected(!isSelected)
  }

  return (
    <button 
        onClick={handleFilter}
        className={
        `flex items-center rounded-lg py-3 px-6 border 
        ${isSelected ? 'bg-white text-[#444444] border-[#444444]' : 'bg-Purple text-white border-transparent'}`
    }>
      {resource}
    </button>
  )
}
