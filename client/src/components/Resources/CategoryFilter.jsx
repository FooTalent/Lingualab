import { useState } from "react"

export default function CategoryFilter({onClick, resource}) {

  const [isSelected, setIsSelected] = useState(false)

  const handleFilter = (cat) => {
    setIsSelected(prevIsSelected => {
      const newIsSelected = !prevIsSelected
      if (newIsSelected) {
        onClick(cat)
      } else {
        onClick('')
      }
      return newIsSelected
    })
  
    if(!isSelected) return onClick(cat)
    if(isSelected) return onClick('')
  }

  return (
    <button 
        onClick={() => handleFilter(resource)}
        className={
        `flex items-center rounded-lg py-3 px-6 border 
        ${isSelected ?  'bg-Purple text-white border-transparent' : 'bg-white text-[#444444] border-[#444444]'}`
    }>
      {resource}
    </button>
  )
}
