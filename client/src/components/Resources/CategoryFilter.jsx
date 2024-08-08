import IconSvg from "../../utils/SvgWrapper"

export default function CategoryFilter({ onClick, resource, isSelected }) {

  const handleFilter = () => {
    onClick(resource)
  }
  return (
    <button
      onClick={handleFilter}
      className={
        `flex items-center text-lg leading-6 rounded-lg py-3 px-6 font-medium tracking-wider border gap-6 ease-out duration-600
        ${isSelected ? 'bg-Purple text-white border-transparent' : 'bg-white text-card border-card'}`
      }>
      <IconSvg category={resource} />
      {resource}
    </button>
  )
}
