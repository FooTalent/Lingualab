import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../../components/ErrorMessage';

const CreateClassForm = ({ programData, onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange",
    defaultValues: {
      teacher: programData.teacher._id,
      language: programData.language,
      level: programData.level,
      program: programData._id,
      title: '',
      description: ''
    }
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="mb-4">
        <label className="block text-gray-700">Título</label>
        <input
          type="text"
          {...register("title", { required: "Este campo es obligatorio" })}
          className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Descripción</label>
        <input
          type="text"
          {...register("description", { required: "Este campo es obligatorio" })}
          className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Crear
        </button>
      </div>
    </form>
  );
};

export default CreateClassForm;