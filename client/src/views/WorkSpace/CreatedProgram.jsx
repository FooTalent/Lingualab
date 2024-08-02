import React from 'react'
import Logo from '/CreasteUnPrograma.png'

export default function CreatedProgram() {
    return (
        <div className='flex flex-col gap-8'>
            <div>
                <img src={Logo} alt="" />
            </div>

            <h2
                className='text-xl text-center font-medium'
            >
                ¿Desea crear la clase o ir al programa creado?
            </h2>

            <div className='grid grid-cols-2 gap-6'>
                <button
                    className="border border-Purple bg-white hover:bg-Purple text-Purple hover:text-white font-extrabold py-3 px-8 rounded-lg mr-2 ease-linear duration-150"
                >
                    Ir al programa
                </button>
                <button
                    className="border border-Purple bg-Purple hover:bg-PurpleHover text-white font-extrabold py-3 px-8 rounded-lg ease-linear duration-150"
                >
                    Crear clase
                </button>
            </div>
        </div>
    )
}
