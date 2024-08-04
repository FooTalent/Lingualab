import IconImage from '../../utils/IconImage'

export default function CategoryFilter({onClick, resource, isSelected}) {

  const handleFilter = () => {
    onClick(resource)
  }
  return (
    <button 
        onClick={handleFilter}
        className={
        `flex items-center rounded-lg py-3 px-6 border gap-4
        ${isSelected ?  'bg-Purple text-white border-transparent' : 'bg-white text-[#444444] border-[#444444]'}`
    }>
      <IconImage 
        category={resource} 
        className={`${isSelected ? 'text-white' : 'fill-current'}`} 
      />
      {resource}
    </button>
  )
}
