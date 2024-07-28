import { useState } from "react"
import { postResource } from "../../services/resources"
import { Toast } from "../../utils/toast"


export default function CreateResourceForm() {
    const [level, setLevel] = useState('')
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newResource = await postResource({
            title,
            type,
            level,
            language,
            url,
            description
        })
        if (newResource.isError === false) {
            Toast.fire({
                title: "Recurso agregado",
                icon: "success"
            })
        } else {
            Toast.fire({
                title: `${newResource.message}`,
                icon: "error"
            })
        }

    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Crea un nuevo Recurso</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-row justify-between">
                        <div className="w-full mr-2">
                            <label htmlFor="level" className="block text-gray-700 font-bold mb-2">Nivel:</label>
                            <select
                                id="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>Elegir nivel</option>
                                <option value="A1-A2">Básico: A1-A2</option>
                                <option value="B1-B2">Intermedio: B1-B2</option>
                                <option value="C1-C2">Avanzado: C1-C2</option>
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Recurso:</label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>Elegir la categoría del recurso</option>
                                <option value="Juego">Juego</option>
                                <option value="Canción">Canción</option>
                                <option value="Serie">Serie</option>
                                <option value="Película">Película</option>
                                <option value="Diccionario">Diccionario</option>
                                <option value="Libro">Libro</option>
                                <option value="Audio Libro">Audiolibro</option>
                                <option value="Ejercicio">Ejercicio</option>
                                <option value="Examen">Examen</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Nombre:</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Escribe el nombre del recurso..."
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="language" className="block text-gray-700 font-bold mb-2">Idioma:</label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>Elegir el idioma del recurso</option>
                            <option value="Inglés">Inglés</option>
                            <option value="Español">Español</option>
                            <option value="Francés">Francés</option>
                            <option value="Alemán">Alemán</option>
                            <option value="Chino">Chino</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="url" className="block text-gray-700 font-bold mb-2">Link del Recurso:</label>
                        <input
                            type="url"
                            id="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://..."
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Observaciones:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => console.log('Cancelar')}
                            className="px-4 py-2 border border-Purple text-Purple  rounded-md hover:bg-purple-100"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-Purple text-white rounded-md hover:bg-purple-700"
                        >
                            Agregar Recurso
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
