import { useForm, Controller } from 'react-hook-form';
import { LEVELS, LEVELS_MAP } from '../utils/valueLists';
import ButtonModal from './Form/ButtonModal';
import ErrorMessage from './ErrorMessage';

const AddStudentForm = ({ onSubmit, onClose }) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      first_Name: '',
      last_name: '',
      email: '',
      level: 'A1-A2',
      birthday: '',
      phone: '',
    },
  });

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-2">
      <div className='flex flex-col gap-2'>
        <label htmlFor="nombre" className='p-0 text-lg leading-5 font-medium'>Nombre</label>
        <Controller
          name="first_name"
          control={control}
          rules={{
            required: 'El nombre es obligatorio',
            pattern: {
              value: /^[a-zA-ZÁ-ÿ\s]+$/i,
              message: 'El nombre no debe contener números ni caracteres especiales',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id='nombre'
              placeholder="Ingresa el nombre"
              className={`border ${errors.first_name ? 'border-red-500' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
            />
          )}
        />
        {errors.first_name && (
          <ErrorMessage>{errors.first_name.message}</ErrorMessage>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="apellido" className='p-0 text-lg leading-5 font-medium'>Apellido</label>
        <Controller
          name="last_name"
          control={control}
          rules={{
            required: 'El apellido es obligatorio',
            pattern: {
              value: /^[a-zA-ZÁ-ÿ\s]+$/i,
              message: 'El apellido no debe contener números ni caracteres especiales',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id='apellido'
              type="text"
              placeholder="Ingresa el apellido"
              className={`border ${errors.last_name ? 'border-red-500' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
            />
          )}
        />
        {errors.last_name && (
          <ErrorMessage>{errors.last_name.message}</ErrorMessage>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="email" className='p-0 text-lg leading-5 font-medium'>Email</label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: 'El email es obligatorio',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'El formato del email no es válido',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id='email'
              type="email"
              placeholder="Ingresa el Email"
              className={`border ${errors.email ? 'border-red-500' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
            />
          )}
        />
        {errors.email && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="nivel" className='p-0 text-lg leading-5 font-medium'>Nivel</label>
        <Controller
          name="level"
          control={control}
          rules={{ required: 'El nivel es obligatorio' }}
          render={({ field }) => (
            <select
              {...field}
              id='nivel'
              name="level"
              className={`border ${errors.level ? 'border-red-500' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
            >
              <option value='' disabled>Selecciona el nivel</option>
              {
                LEVELS.map((level, i) => (
                  <option key={i} value={level.data}>
                    {level.data}
                  </option>
                ))
              }
            </select>
          )}
        />
        {errors.level && (
          <ErrorMessage>{errors.level.message}</ErrorMessage>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="fechaNacimiento" className='p-0 text-lg leading-5 font-medium'>Fecha de nacimiento</label>
        <Controller
          name="birthday"
          control={control}
          rules={{ required: 'La fecha de nacimiento es obligatoria' }}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              id="fechaNacimiento"
              placeholder="Fecha de Nacimiento"
              className={`border ${errors.birthday ? 'border-red-500' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
            />
          )}
        />
        {errors.birthday && (
          <ErrorMessage>{errors.birthday.message}</ErrorMessage>
        )}
      </div>

      <div className='flex flex-col gap-2'>
        <label htmlFor="tel" className='p-0 text-lg leading-5 font-medium'>Teléfono</label>
        <Controller
          name="phone"
          control={control}
          rules={{
            required: 'El teléfono es obligatorio',
            pattern: {
              value: /^\+?[0-9\s-]{7,}$/,
              message: 'El formato del teléfono no es válido',
            },
          }}
          render={({ field }) => (
            <input
              {...field}
              id='tel'
              type="tel"
              placeholder="+54 - 11 - 0000 - 0000"
              className={`border ${errors.phone ? 'border-red-500' : 'border-Grey'} hover:border-card focus:border-card text-Grey rounded-lg py-2 px-4 ease-out duration-600 focus:outline-none`}
            />
          )}
        />
        {errors.phone && (
          <ErrorMessage>{errors.phone.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-2 gap-8 mt-5">
        <ButtonModal buttonAction={onClose} type={'prev'} label={'Cancelar'} />
        <ButtonModal type={'submit'} label={'Guardar'} />
      </div>
    </form>
  );
};

export default AddStudentForm;
