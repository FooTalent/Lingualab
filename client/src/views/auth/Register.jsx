import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import InputList from '../../components/form/InputList'

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

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

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
            validations: /^[a-zA-Z]{3,}$/,
            messageError: 'Debe contener como mínimo 3 carácteres'
        }

        switch (inputName) {
            case 'first_name':
                params.label = 'Nombre';
                break;
            case 'last_name':
                params.label = 'Apellido';
                break;
            case 'email':
                params = {
                    label: 'Correo',
                    type: 'email',
                    validations: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    messageError: 'Email incorrecto',
                };
                break;
            case 'password':
                params = {
                    label: 'Contraseña',
                    type: 'password',
                    validations: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
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
                className="space-y-2"
                noValidate
            >
                <Link
                    to={'/auth/login'}
                    className='link'
                >¿Ya tienes usuario?</Link>

                <InputList
                    data={initialValues}
                    register={register}
                    errors={errors}
                    getInputConfig={getInputConfig}
                />
                <input
                    type="submit"
                    value='Registrarse'
                    className="inputSubmit"
                />
            </form>
        </React.Fragment>
    );
}
