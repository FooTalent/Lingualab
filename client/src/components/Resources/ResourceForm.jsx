import { useEffect, useState } from "react"
import { LEVELS_MAP, RESOURCE_TYPES } from "../../utils/valueLists"
import { getLanguages } from "../../services";

export default function CreateResourceForm({ onSubmit, onCancel, data }) {
    const [languageOptions, setLanguageOptions] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        type: '',
        level: '',
        language: '',
        url: '',
        description: ''
    })

    useEffect(() => {
        const fetchValues = async () => {
        try {
            const languages = await getLanguages();
            setLanguageOptions(languages.map(language => ({ value: language, label: language })));
            setFormData({...formData, language: languages[0]});
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };

    fetchValues();
    }, []);

    useEffect(() => {
        if (data) {
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
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit(data._id, formData)
        }
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
            >
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-4">
                        <label
                            htmlFor="language"
                            className="text-lg leading-5 p-0"
                        >
                            Idioma:
                        </label>

                        <select
                            id="language"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className={`border ${formData.language ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                            required
                        >
                            <option value="" disabled>Seleccionar el idioma</option>
                            {
                                languageOptions.map((lvl, i) => (
                                    <option key={i} value={lvl}>{lvl}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="flex flex-col gap-4">
                        <label htmlFor="level" className="text-lg leading-5 p-0">Nivel:</label>
                        <select
                            id="level"
                            name="level"
                            value={formData.level}
                            onChange={handleChange}
                            className={`border ${formData.type ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
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

                    <div className="flex flex-col gap-4">
                        <label htmlFor="type" className="text-lg leading-5 p-0">Recurso:</label>
                        <select
                            id="type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={`border ${formData.type ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
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
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="title" className="text-lg leading-5 p-0">Nombre del recurso:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Escribe el nombre del recurso..."
                        className={`border ${formData.title ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                        required
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="url" className="text-lg leading-5 p-0">Link del Recurso:</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder="https://..."
                        className={`border ${formData.url ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                        required
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <label htmlFor="description" className="text-lg leading-5 p-0">Observaciones:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className={`border h-[90px] ${formData.description ? 'border-card text-card' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                        placeholder="Incluya comentarios adicionales sobre cómo utilizar este recurso."
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <button
                        type="button"
                        onClick={onCancel}
                        className={`outline-none border rounded-lg py-3 px-8 text-xl font-extrabold ease-out duration-600 tracking-wide border-Purple text-Purple hover:bg-Purple hover:text-white hover:border-PurpleHover focus:border-PurpleHover`}
                        >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className={`outline-none border rounded-lg py-3 px-8 text-xl font-extrabold ease-out duration-600 tracking-wide border-Purple bg-Purple text-white hover:border-PurpleHover hover:bg-PurpleHover focus:border-PurpleHover`}
                        >
                        {data ? 'Editar Recurso' : 'Agregar Recurso'}
                    </button>
                </div>
            </form>
        </div>
    )
}
