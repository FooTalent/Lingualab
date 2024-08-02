import { useState } from "react"

export default function LevelFilter({data, onClick}) {

  const [isSelected, setIsSelected] = useState(false)

  const handleFilter = (lvl) => {
    setIsSelected(prevIsSelected => {
      const newIsSelected = !prevIsSelected
      if (newIsSelected) {
        onClick(lvl)
      } else {
        onClick('')
      }
      return newIsSelected
    })
  
    if(!isSelected) return onClick(lvl)
    if(isSelected) return onClick('')
  }

  const buttonStyle = isSelected 
    ? { backgroundColor: data.color, color: 'white' } 
    : { backgroundColor: 'transparent', color: data.inactive, borderColor: data.inactive }

  return (
    <button 
      onClick={() => handleFilter(data.data)}
      className={`flex items-center rounded-lg py-3 px-6 border ${isSelected ? 'shadow-md' : ''}`}
      style={buttonStyle}
    >
      {data.data}
    </button>
  )
}