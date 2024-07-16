import ErrorMessage from "../../components/ErrorMessage"
import { useForm } from "react-hook-form"
import { useAppStore } from "../../store/useAppStore"
import { Link } from "react-router-dom"



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

    return (
        <>
            <h1 className="text-5xl font-black ">Reestablecer Password</h1>
            <p className="text-2xl font-light mt-5">
                ¿Olvidaste tu contraseña? ingresa tu email {''}
                <span className=" text-Purple font-bold"> y reestable tu contraseña</span>
            </p>

            <form
                onSubmit={handleSubmit(handleForgotPassword)}
                className="space-y-8 p-10"
                noValidate
            >
                <div className="flex flex-col gap-2 w-[384px]">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email de registro es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Enviar Instrucciones'
                    className="bg-Purple hover:bg-PurpleHover w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className="flex flex-col space-y-4">
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
