import React from 'react';
import ErrorMessage from '../ErrorMessage';

export default function InputForm({ inputName, register, errors, getInputConfig }) {
    return (
        <div key={inputName} className="flex flex-col gap-1">
            <label className="font-normal text-2xl">{getInputConfig(inputName).label}</label>
            <input
                id={inputName}
                type={getInputConfig(inputName).type}
                className="w-full p-2 border-gray-300 border"
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