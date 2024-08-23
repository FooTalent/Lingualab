import { useEffect, useState } from 'react';
import { LEVELS } from '../../../../utils/valueLists';
import DropdownSelect from '../../SubComponents/DropdownSelect';
import ButtonModal from '../../../../components/Form/ButtonModal';
import { getLanguages } from '../../../../services';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../../../../components/ErrorMessage';

const CreateProgramForm = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();
  const [languageOptions, setLanguageOptions] = useState([]);
  const [programData, setProgramData] = useState({
    title: '',
    description: '',
    language: '',
    level: LEVELS[0].data,
  });

  useEffect(() => {
    const fetchValues = async () => {
      try {
        const languages = await getLanguages();
        const defaultLanguage = languages[0] || '';
        const languageOptions = languages.map(language => ({ value: language, label: language }));

        setLanguageOptions(languageOptions);
        setProgramData(prevData => ({
          ...prevData,
          language: defaultLanguage,
        }));
        setValue('language', defaultLanguage);
        setValue('level', LEVELS[0].data);

      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    };

    fetchValues();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProgramData({
      ...programData,
      [name]: value,
    });
  };

  const handleSelectChange = (field, value) => {
    setProgramData({
      ...programData,
      [field]: value,
    });
  };

  const handleForm = () => {
    onSubmit(programData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='flex flex-col gap-y-5 lg:gap-y-4'
    >
      <div className="flex flex-col gap-4 lg:gap-3 font-medium mt-4">
        <label className="p-0 text-lg md:text-custom">Título</label>
        <input
          type="text"
          name="title"
          value={programData.title}
          {...register("title", {
            required: "Escriba un titulo",
            onChange: (e) => {
              handleInputChange(e);
              clearErrors("title");
            }
          })}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe el nombre del programa...'
        />
        {errors.title && (
          <ErrorMessage>{errors.title.message}</ErrorMessage>
        )}
      </div>

      <div className="flex flex-col gap-4 lg:gap-3 font-medium">
        <label className="p-0 text-lg md:text-custom">Descripción</label>
        <input
          type="text"
          name="description"
          value={programData.description}
          {...register("description", {
            required: "Brinde una descripción",
            onChange: (e) => {
              handleInputChange(e);
              clearErrors("description");
            }
          })}
          className="py-3 px-4 border border-Grey rounded-lg placeholder:text-Grey outline-none focus:border-card hover:border-card"
          placeholder='Escribe una breve descripción...'
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className='flex flex-col gap-4 lg:gap-3 font-medium'>
        <DropdownSelect
          setValue={setValue}
          name="language"
          errors={errors}
          clearErrors={clearErrors}
          register={register("language", { required: "Selecciona un idioma" })}
          label="Idioma"
          options={languageOptions}
          selectedOption={programData.language}
          onSelect={(value) => handleSelectChange('language', value)}
        />
      </div>

      <div className='flex flex-col gap-4 lg:gap-3 font-medium'>
        <DropdownSelect
          setValue={setValue}
          name="level"
          errors={errors}
          clearErrors={clearErrors}
          register={register("level", { required: "Selecciona un nivel" })}
          label="Nivel"
          options={LEVELS.map(level => level.data)}
          selectedOption={programData.level}
          onSelect={(value) => handleSelectChange('level', value)}
        />
      </div>


      <div className="grid grid-cols-2 gap-8">
        <ButtonModal buttonAction={onClose} type='prev' label='Cancelar' />
        <ButtonModal buttonAction={onSubmit} type='next' label='Crear Programa' />
      </div>
    </form>
  );
};

export default CreateProgramForm;