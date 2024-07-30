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
            <p className="text-2xl font-[500] text-black">
                Recuperá tu contraseña
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
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
                    value='Enviar Instrucciones'
                    className="inputSubmit"
                />
            </form>
            <nav className="flex justify-between px-4">
                <span className="font-[500] text-sm">¿Recordaste tu contraseña?{' '}
                    <Link
                        to='/auth/login'
                        className="link"
                    >
                        Inicia Sesión
                    </Link>
                </span>
            </nav>

        </>
    )
}

export default ForgotPassword
