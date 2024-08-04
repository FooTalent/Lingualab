import { useState } from "react"
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
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-row justify-between gap-6 justify-self-end self-stretch content-stretch">
                        <div className="w-full flex flex-col justify-between">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2 px-0">Recurso:</label>
                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                required
                            >
                                <option value="" disabled>Seleccionar el recurso</option>
                                {
                                    RESOURCE_TYPES.map((lvl, i) => (
                                        <option key={i} value={lvl}>{lvl}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <label htmlFor="level" className="block text-gray-700 font-bold mb-2 px-0">Nivel:</label>
                            <select
                                id="level"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                required
                            >   
                                <option value="" disabled>Seleccionar el nivel</option>
                                {
                                    levelsArr.map((lvl, i) => (
                                        <option key={i} value={lvl}>{lvl}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <label htmlFor="language" className="block text-gray-700 font-bold mb-2 px-0">Idioma:</label>
                            <select
                                id="language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                required
                            >   
                                <option value="" disabled>Seleccionar el idioma</option>
                                {
                                    LANGUAGES.map((lvl, i) => (
                                        <option key={i} value={lvl}>{lvl}</option>
                                    ))
                                }
                        </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2 px-0">Nombre del recurso:</label>
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
                    <div className="mb-4">
                        <label htmlFor="url" className="block text-gray-700 font-bold mb-2 px-0">Link del Recurso:</label>
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
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2 px-0">Observaciones:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            placeholder="Incluya comentarios adicionales sobre cómo utilizar este recurso."
                        />
                    </div>

                    <div className="flex justify-center gap-6">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="w-full px-4 py-2 border border-Purple text-Purple  rounded-md hover:bg-Purple hover:text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-Purple text-white rounded-md hover:bg-PurpleHover"
                        >
                            Agregar Recurso
                        </button>
                    </div>
                </form>
            </div>
    )
}
