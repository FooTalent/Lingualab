import { useForm } from "react-hook-form"
import { useAppStore } from "../../store/useAppStore"
import { Link } from "react-router-dom"
import InputList from '../../components/form/InputList'



const ForgotPassword = () => {
    const { forgotPassword } = useAppStore()
    const initialValues = {
        email: ''
    }
    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });
    const handleForgotPassword = async (formData) => {
        await forgotPassword(formData)
        reset()
    }
    const getInputConfig = () => ({
        label: 'Email',
        type: 'email',
        placeholder: 'Ingresa tu email'
    });


    return (
        <>
            <p className="text-2xl font-light mt-5 text-Purple">
                ¿Olvidaste tu contraseña? ingresa tu email {''}
                <span className="font-bold"> y reestablece tu contraseña</span>
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="flex flex-col md:gap-[20px] md:w-[404px]"
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
                    value='Enviar Instrucciones'
                    className="inputSubmit"
                />
            </form>
            <nav className="flex flex-col space-y-4 text-Purple">
                <Link
                    to='/auth/login'
                    className="text-center font-normal"
                >
                    ¿Ya tienes cuenta? Iniciar Sesión
                </Link>

                <Link
                    to='/auth/register'
                    className="text-center font-normal"
                >
                    ¿No tienes cuenta? Registrate
                </Link>
            </nav>

        </>
    )
}

export default ForgotPassword
