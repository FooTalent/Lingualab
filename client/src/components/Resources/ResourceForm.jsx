import { useEffect, useState } from "react"
import { LEVELS_MAP, RESOURCE_TYPES, LANGUAGES } from "../../utils/valueLists"


export default function CreateResourceForm({onSubmit, onCancel, data}) {
    
    
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        level: '',
        language: '',
        url: '',
        description: ''
    })

    useEffect(() => {
        if(data){
            setFormData({
                title: data.title || '',
                type: data.type || '',
                level: data.level || '',
                language: data.language || '',
                url: data.url || '',
                description: data.description || ''
            })
        }
    }, [data])

    const levelsArr = Object.keys(LEVELS_MAP)

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(onSubmit){
            onSubmit(data._id, formData)
        }
    }

    return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 flex flex-row justify-between gap-6 justify-self-end self-stretch content-stretch">
                        <div className="w-full flex flex-col justify-between">
                            <label htmlFor="type" className="block text-gray-700 font-bold mb-2 px-0">Recurso:</label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                                required
                            >
                                <option value="" disabled>Seleccionar el recurso</option>
                                {
                                    RESOURCE_TYPES.map((type, i) => (
                                        <option key={i} value={type}>{type}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="w-full flex flex-col justify-between">
                            <label htmlFor="level" className="block text-gray-700 font-bold mb-2 px-0">Nivel:</label>
                            <select
                                id="level"
                                name="level"
                                value={formData.level}
                                onChange={handleChange}
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
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
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
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
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
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-bold mb-2 px-0">Observaciones:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
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
                            {data ? 'Editar Recurso' : 'Agregar Recurso'}
                        </button>
                    </div>
                </form>
            </div>
    )
}
