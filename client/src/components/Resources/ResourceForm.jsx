import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LEVELS_MAP, RESOURCE_TYPES } from "../../utils/valueLists";
import { getLanguages } from "../../services";
import ErrorMessage from "../ErrorMessage";

export default function CreateResourceForm({ onSubmit, onCancel, data }) {
    const [languageOptions, setLanguageOptions] = useState([]);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        mode: "onChange",
        defaultValues: {
            title: '',
            type: '',
            level: '',
            language: '',
            url: '',
            description: ''
        }
    });

    useEffect(() => {
        const fetchValues = async () => {
            try {
                const languages = await getLanguages();
                setLanguageOptions(languages.map(language => ({ value: language, label: language })));
                if (!data) {
                    setValue("language", languages[0]?.value || '');
                }
            } catch (error) {
                console.error('Error fetching languages:', error);
            }
        };

        fetchValues();
    }, [data, setValue]);

    useEffect(() => {
        if (data && languageOptions.length > 0) {
            setValue("title", data.title || '');
            setValue("type", data.type || '');
            setValue("level", data.level || '');
            setValue("language", data.language || '');
            setValue("url", data.url || '');
            setValue("description", data.description || '');
        }
    }, [data, languageOptions, setValue]);

    const levelsArr = Object.keys(LEVELS_MAP);

    const handleFormSubmit = (formData) => {
        if (data) {
            onSubmit(data._id, formData);
        } else {
            onSubmit(formData);
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="flex flex-col gap-2"
            >
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="language" className="text-lg leading-5 p-0">Idioma:</label>
                        <select
                            id="language"
                            {...register("language", { required: "Este campo es obligatorio" })}
                            className={`border ${errors.language ? 'border-red-500 text-red-500' : 'border-card text-card'} hover:border-card focus:border-card rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                        >
                            <option value="" disabled>Seleccionar el idioma</option>
                            {
                                languageOptions.map((option, i) => (
                                    <option key={i} value={option.value}>{option.value}</option>
                                ))
                            }
                        </select>
                        {errors.language && (
                            <ErrorMessage>{errors.language.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="level" className="text-lg leading-5 p-0">Nivel:</label>
                        <select
                            id="level"
                            {...register("level", { required: "Este campo es obligatorio" })}
                            className={`border ${errors.level ? 'border-red-500 text-red-500' : 'border-card text-card'} hover:border-card focus:border-card rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                        >
                            <option value="" disabled>Seleccionar el nivel</option>
                            {
                                levelsArr.map((lvl, i) => (
                                    <option key={i} value={lvl}>{lvl}</option>
                                ))
                            }
                        </select>
                        {errors.level && (
                            <ErrorMessage>{errors.level.message}</ErrorMessage>
                        )}
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="type" className="text-lg leading-5 p-0">Recurso:</label>
                        <select
                            id="type"
                            {...register("type", { required: "Este campo es obligatorio" })}
                            className={`border ${errors.type ? 'border-red-500 text-red-500' : 'border-card text-card'} hover:border-card focus:border-card rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                        >
                            <option value="" disabled>Seleccionar el recurso</option>
                            {
                                RESOURCE_TYPES.map((type, i) => (
                                    <option key={i} value={type}>{type}</option>
                                ))
                            }
                        </select>
                        {errors.type && (
                            <ErrorMessage>{errors.type.message}</ErrorMessage>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-lg leading-5 p-0">Nombre del recurso:</label>
                    <input
                        type="text"
                        id="title"
                        {...register("title", { required: "Este campo es obligatorio" })}
                        placeholder="Escribe el nombre del recurso..."
                        className={`border ${errors.title ? 'border-red-500 text-red-500' : 'border-card text-card'} hover:border-card focus:border-card rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                    />
                    {errors.title && (
                        <ErrorMessage>{errors.title.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="url" className="text-lg leading-5 p-0">Link del Recurso:</label>
                    <input
                        type="url"
                        id="url"
                        {...register("url", { required: "Este campo es obligatorio", pattern: { value: /^(https?:\/\/)?([\w\-]+)+([\w\-]*)+(\.\w{2,})+(:[0-9]+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/, message: "URL no válida" } })}
                        placeholder="https://..."
                        className={`border ${errors.url ? 'border-red-500 text-red-500' : 'border-card text-card'} hover:border-card focus:border-card rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                    />
                    {errors.url && (
                        <ErrorMessage>{errors.url.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="text-lg leading-5 p-0">Observaciones:</label>
                    <textarea
                        id="description"
                        {...register("description", { required: "Este campo es obligatorio" })}
                        className={`border h-[90px] ${errors.description ? 'border-red-500 text-red-500' : 'border-card text-card'} hover:border-card focus:border-card rounded-lg py-3 px-4 ease-out duration-600 focus:outline-none`}
                        placeholder="Incluya comentarios adicionales sobre cómo utilizar este recurso."
                    />
                    {errors.description && (
                        <ErrorMessage>{errors.description.message}</ErrorMessage>
                    )}
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
                        {data ? 'Guardar edición' : 'Agregar Recurso'}
                    </button>
                </div>
            </form>
        </div>
    )
}