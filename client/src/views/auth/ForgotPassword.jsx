import { useForm } from "react-hook-form"
import { useAppStore } from "../../store/useAppStore"
import { Link } from "react-router-dom"
import InputList from '../../components/Form/InputList'
import Spinner from "../../components/Spinner/Spinner"
import { useEffect, useState } from "react"

const ForgotPassword = () => {
    const { forgotPassword } = useAppStore()
    const [loading, setLoading] = useState(false)
    const initialValues = {
        email: ''
    }

    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [loading]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const handleForgotPassword = async (formData) => {
        setLoading(true)
        await forgotPassword(formData)
        reset()
        setLoading(false)
    }

    const getInputConfig = () => ({
        label: 'Email',
        type: 'email',
        placeholder: 'Ingresa tu email'
    });


    return (
        <>
            {
                loading && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <Spinner />
                    </div>
                )
            }

            <p className="text-2xl font-medium text-black">
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
