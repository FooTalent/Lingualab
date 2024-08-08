import { useState } from "react"

export default function LevelFilter({data, onClick, isSelected}) {

  // const [isSelected, setIsSelected] = useState(false)

  const handleFilter = () => {
    onClick(data.data)
  }

  const buttonStyle = isSelected 
    ? { backgroundColor: data.color, color: 'white' } 
    : { backgroundColor: 'transparent', color: data.inactive, borderColor: data.inactive }

  return (
    <button 
      onClick={handleFilter}
      className={`rounded-lg py-3 px-6 border text-lg leading-5 ease-out duration-600`}
      style={buttonStyle}
    >
      {data.data}
    </button>
  )
}