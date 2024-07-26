import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputList from '../../components/Form/InputList';

export default function Register() {
    const navigate = useNavigate();
    const { userRegister, complete } = useAppStore();

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: true,
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: initialValues, mode: 'onChange', reValidateMode: 'onChange'
    });

    const handleForm = async (formData) => {
        await userRegister(formData);
        if (complete) {
            navigate("/auth/login");
        }
        reset();
    };

    const getInputConfig = (inputName) => {
        let params = {
            label: '',
            type: 'text',
            placeholder: '',
            validations: /^[a-zA-Z]{3,}$/,
            messageError: 'Debe contener como mínimo 3 carácteres'
        }

        switch (inputName) {
            case 'first_name':
                params = {
                    label: 'Nombre',
                    type: 'text',
                    placeholder: 'Ingresa tu nombre',
                    validations: /^[a-zA-Z]*$/,
                    messageError: 'Sole se permiten letras'
                }
                break;
            case 'last_name':
                params = {
                    label: 'Apellido',
                    type: 'text',
                    placeholder: 'Ingresa tu apellido',
                    validations: /^[a-zA-Z]*$/,
                    messageError: 'Sole se permiten letras'
                }
                break;
            case 'email':
                params = {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'Ingresa tu email',
                    validations: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    messageError: 'Email incorrecto',
                };
                break;
            case 'password':
                params = {
                    label: 'Contraseña',
                    type: 'password',
                    placeholder: 'Crea una contraseña',
                    validations: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/,
                    messageError: `La contraseña debe contener:
                    \nMínimo 8 carácteres
                    \nUna letra mayúscula 
                    \nUna letra minúscula 
                    \nUn carácter especial`,
                };
                break;
            default:
                break;
        }

        return params;
    };

    return (
        <React.Fragment>

            <form
                onSubmit={handleSubmit(handleForm)}
                className="formUser"
                noValidate
            >
                <InputList
                    data={initialValues}
                    register={register}
                    errors={errors}
                    getInputConfig={getInputConfig}
                />
                <input
                    type="submit"
                    value='Crear Cuenta'
                    className="inputSubmit"
                />
            </form>
            <div className='flex flex-col items-center w-full'>
                <span className="font-semibold text-sm">Ya tengo cuenta{' '}
                    <Link
                        to={'/auth/login'}
                        className='link'
                    >Ingresar</Link>
                </span>
            </div>

        </React.Fragment>
    );
}
