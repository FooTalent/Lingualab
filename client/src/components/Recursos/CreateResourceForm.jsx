import { useState } from "react"
import { postResource } from "../../services/resources.services"
import { Toast } from "../../utils/toast"
import { LEVELS_MAP, RESOURCE_TYPES, LANGUAGES } from "../../utils/valueLists"


export default function CreateResourceForm({onSubmit, onCancel}) {
    const [level, setLevel] = useState('')
    const [type, setType] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [language, setLanguage] = useState('')

    const levelsArr = Object.keys(LEVELS_MAP)

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({
            title,
            type,
            level,
            language,
            url,
            description
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen bg-black bg-opacity-40">
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
                                className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500"
                                required
                            >   
                                <option value="" disabled>Elegir nivel</option>
                                {
                                    levelsArr.map((lvl, i) => (
                                        <option key={i} value={lvl}>{lvl}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-full">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2">Recurso:</label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500"
                                required
                            >
                                <option value="" disabled>Elegir la categoría del recurso</option>
                                {
                                    RESOURCE_TYPES.map((lvl, i) => (
                                        <option key={i} value={lvl}>{lvl}</option>
                                    ))
                                }
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
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4 w-full">
                        <label htmlFor="language" className="block text-gray-700 font-bold mb-2">Idioma:</label>
                        <select
                            id="language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="block w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-indigo-500"
                            required
                        >
                            <option value="" disabled>Elegir el idioma del recurso</option>
                            {
                                LANGUAGES.map((lvl, i) => (
                                    <option key={i} value={lvl}>{lvl}</option>
                                ))
                            }
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
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Observaciones:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                        />
                    </div>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onCancel}
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
