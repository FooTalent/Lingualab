import musicIcon from './assets/icon-music.svg'
import puzzleIcon from './assets/icon-puzzle.svg'
import controllerIcon from './assets/icon-controller.svg'
import bookMusicIcon from './assets/icon-book-music.svg'
import movieIcon from './assets/icon-movie.svg'
import dictionaryIcon from './assets/icon-dictionary.svg'

export default function CategoryFilter({onClick, resource, isSelected}) {

  const ICONS = {
    "Canción": musicIcon,
    "Ejercicio": puzzleIcon,
    "Juego": controllerIcon,
    "Libro/Audio Libros": bookMusicIcon,
    "Serie/Película": movieIcon,
    "Diccionario": dictionaryIcon,
  }

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
      <img 
        src={ICONS[resource]} 
        alt={`ícono de ${resource}`}
        className={`${isSelected ? 'text-white' : 'fill-current'}`}
      />
      {resource}
    </button>
  )
}
