import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useAppStore } from "../../store/useAppStore";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { userLogin, localLogin, status } = useAppStore()

    useEffect(() => {
        if (status) {
            navigate('/')
        }
    }, [status, navigate]);

    const handleLogin = async (formData) => {
        console.log(formData)
        await userLogin(formData)
        await localLogin()
    }

    return (
        <>
            <h1 className="text-5xl font-black text-white">Iniciar Sesión</h1>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 mt-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
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

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-Purple hover:bg-PurpleHover w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
                <Link to={'/auth/register'}>Registrarse</Link>
            </form>
        </>
    )
}

export default Login
