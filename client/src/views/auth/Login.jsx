import { useForm } from "react-hook-form";

import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputList from "../../components/Form/InputList";


const Login = () => {
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { userLogin, localLogin, status } = useAppStore()

    const getInputConfig = (inputName) => {
        let params = {
            label: '',
            type: '',
            validations: '',
            messageError: ''
        }

        switch (inputName) {
            case 'email':
                params = {
                    label: 'Email',
                    type: 'email',
                };
                break;
            case 'password':
                params = {
                    label: 'Contraseña',
                    type: 'password',
                };
                break;
            default:
                break;
        }
        return params;
    };

    useEffect(() => {
        if (status) {
            navigate('/classroom')
        }
    }, [status, navigate]);

    const handleLogin = async (formData) => {
        await userLogin(formData)
        await localLogin()
    }
    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="flex flex-col md:w-[404px] md:gap-[8px]"
                noValidate
            >
                <InputList
                    data={initialValues}
                    register={register}
                    errors={errors}
                    getInputConfig={getInputConfig}
                />
                <Link
                    to={'/auth/forgot-password'}
                    className="link">
                    ¿Olvidaste tu contraseña?
                </Link>
                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="inputSubmit"
                />
            </form>
            <div className="flex justify-center items-center">
                <span className="font-semibold text-sm">¿No tienes cuenta?{' '}
                    <Link
                        to={'/auth/register'}
                        className="link">
                        Crear Cuenta
                    </Link>
                </span>
            </div>
        </>
    )
}

export default Login
