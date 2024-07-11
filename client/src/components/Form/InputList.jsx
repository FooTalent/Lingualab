import React from 'react';
import InputForm from './InputForm';
import SwitchToggle from '../../utils/SwitchToggle';

export default function InputList({ data, register, errors, getInputConfig }) {
  return (
    Object.keys(data).map((inputName) => (
      inputName !== 'role'
        ? <InputForm
            key={inputName}
            inputName={inputName}
            register={register}
            errors={errors}
            getInputConfig={getInputConfig}
          />
        : <SwitchToggle
            key={inputName}
            register={register}
          />
    ))
  );
}