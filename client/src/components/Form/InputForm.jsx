import ErrorMessage from '../ErrorMessage';

export default function InputForm({ inputName, register, errors, getInputConfig }) {
    return (
        <div key={inputName} className="flex flex-col gap-2 w-[384px]">
            <label>{getInputConfig(inputName).label}</label>
            <input
                className='w-full p-3 border-gray-300 border placeholder:text-center rounded-lg'
                id={inputName}
                type={getInputConfig(inputName).type}
                {...register(inputName, {
                    required: 'Campo obligatorio',
                    pattern: {
                        value: getInputConfig(inputName).validations,
                        message: getInputConfig(inputName).messageError,
                    },
                })}
            />
            {errors[inputName] && (
                <ErrorMessage>{errors[inputName].message}</ErrorMessage>
            )}
        </div>
    );
}