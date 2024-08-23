import React, { useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { removeAccents } from '../../../utils/removeAccents';

export default function NavWorkSpace({ setModal, buttonDescription, route, onSearch }) {
    const inputRef = useRef(null);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const navigate = useNavigate();

    const handleModal = () => {
        setModal(true)
    }

    const handleSearch = () => {
        const search = inputRef.current.value.trim()
        const normalizedSearch = removeAccents(search)
        onSearch(normalizedSearch)
    }

    return (
        <div className="flex flex-col xl:flex-row justify-between items-center gap-y-8 xl:gap-8">
            <div className='w-full order-2 xl:order-1 flex flex-col lg:flex-row gap-y-6 lg:gap-6 justify-evenly items-center'>
                <div className='w-full md:w-3/4 grid grid-cols-2 gap-6'>
                    <button
                        className={`h-12 flex items-center justify-center ${route === 'aulavirtual' ? 'bg-Yellow font-extrabold' : 'bg-YellowDeselect'} hover:bg-Yellow text-card border-2 border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
                        onClick={() => navigate(`/aulavirtual`)}
                    >
                        Mis aulas
                    </button>
                    <button
                        className={`h-12 flex items-center justify-center ${route === 'workspace' ? 'bg-Yellow font-extrabold' : 'bg-YellowDeselect'} hover:bg-Yellow text-card border-2 border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
                        onClick={() => navigate(`/workspace/`)}
                    > Mis Programas
                    </button>
                </div>

                <button
                    className={`w-full md:w-3/4 lg:w-1/3 h-12 flex items-center justify-center bg-card hover:bg-Yellow font-extrabold text-Yellow hover:text-card border-2 border-card hover:border-Yellow rounded-lg py-3 px-4 ease-linear duration-150`}
                    onClick={handleModal}
                > {buttonDescription} <AddIcon />
                </button>
            </div>

            <div className="flex items-center gap-4 order-1 w-full md:w-3/4 xl:w-full">
                <div
                    className={`flex flex-nowrap gap-2 w-full items-center border ${isInputFocused ? 'border-Purple' : 'border-Grey'} bg-inputBg rounded-lg py-3 px-4 text-card`}
                    onClick={() => inputRef.current.focus()}
                >
                    <SearchIcon />
                    <input
                        ref={inputRef}
                        className='outline-none m-0 p-0 border-0 bg-transparent search-cancel:hidden'
                        type="search"
                        placeholder="¿Qué estás buscando?"
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={() => setIsInputFocused(false)}
                    />
                </div>

                <button
                    onClick={handleSearch}
                    className='py-3 px-4 bg-Purple hover:bg-PurpleHover rounded-lg text-white font-extrabold ease-linear duration-150'
                >
                    Buscar
                </button>
            </div>
        </div>
    )
}
