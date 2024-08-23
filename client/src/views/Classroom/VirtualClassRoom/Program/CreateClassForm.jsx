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
    <form onSubmit={handleSubmit(onFormSubmit)} className='flex flex-col gap-y-5 lg:gap-y-4'>
      <div className="flex flex-col gap-4 lg:gap-3 font-medium mt-4">
        <label className="p-0 text-lg md:text-custom">Título</label>
        <input
          id='title'
          type="text"
          placeholder='Escribe el nombre de la clase...'
          {...register("title", { required: "Este campo es obligatorio" })}
          className={`py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card ${errors.title ? 'border-red-500' : ''}`}
        />
        {errors.title && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:gap-3 font-medium">
        <label className="p-0 text-lg md:text-custom">Descripción</label>
        <input
          id='description'
          type="text"
          placeholder='Escribe una breve descripción...'
          {...register("description", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 10,
              message: "La descripción debe tener al menos 10 caracteres"
            }
          })}
          className={`py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card ${errors.description ? 'border-red-500' : ''}`}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 md:mt-4">
        <button
          type="button"
          className="w-full bg-transparent text-Purple font-extrabold tracking-wide leading-6 border border-Purple px-4 py-2 md:py-3 rounded-md hover:bg-Purple hover:text-white ease-out duration-150"
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="w-full bg-Purple text-white font-extrabold tracking-wide leading-6 px-4 py-2 md:py-3 rounded-md hover:bg-PurpleHover ease-out duration-150"
        >
          Crear clase
        </button>
      </div>
    </form>
  );
};

export default CreateClassForm;