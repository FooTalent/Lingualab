import { useEffect, useState } from "react"
import IconSvg from "../../utils/SvgWrapper"

export default function CategoryFilter({ onClick, resource, selectedCategories, onSelect }) {
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    setIsSelected(selectedCategories.includes(resource))
  }, [selectedCategories, resource])

  const handleFilter = () => {
    onClick(resource)
  }

  return (
    <button
      onClick={handleFilter}
      className={
        `flex items-center text-lg whitespace-nowrap lg:whitespace-normal leading-6 rounded-lg  font-medium tracking-wider border gap-6 ease-out duration-600
        ${onSelect ? 'py-2 px-6' : 'py-3 px-6'}
        ${isSelected ? 'bg-Purple text-white border-transparent' : 'bg-white text-card border-card'}`
      }>
      <IconSvg category={resource} />
      {resource}
    </button>
  )
}
