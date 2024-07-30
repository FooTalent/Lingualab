import { useState } from "react"

export default function LevelFilter({data}) {

  const [isSelected, setIsSelected] = useState('false')

  const handleFilter = () => {
    setIsSelected(!isSelected)
  }

  const buttonStyle = isSelected 
    ? { backgroundColor: data.color, color: 'white' } 
    : { backgroundColor: 'transparent', color: data.inactive, borderColor: data.inactive }

  return (
    <button 
      onClick={handleFilter}
      className={`flex items-center rounded-lg py-3 px-6 border`}
      style={buttonStyle}
    >
      {data.data}
    </button>
  )
}