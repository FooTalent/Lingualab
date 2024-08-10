import { useState } from "react"

export default function LevelFilter({ data, onClick, isSelected, onSelect }) {

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
      className={`rounded-lg border text-lg leading-5 ${onSelect ? 'px-4 py-2' : 'px-6 py-3'} whitespace-nowrap text-center ease-out duration-600`}
      style={buttonStyle}
    >
      {data.data}
    </button>
  )
}