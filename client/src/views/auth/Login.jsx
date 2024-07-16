import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/ErrorMessage";
import { useAppStore } from "../../store/useAppStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import MailIcon from '@mui/icons-material/Mail';
import VpnKeyIcon from '@mui/icons-material/VpnKey';


const Login = () => {
    const navigate = useNavigate()
    const initialValues = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const { userLogin, localLogin, status } = useAppStore()
    const [showPassword, setShowPassword] = useState(false);

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

    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-2"
                noValidate
            >
                <div className="flex flex-col gap-2 w-[384px]">
                    <label
                        className="font-normal text-2xl"
                    >Correo</label>
                    <div className="relative w-full">
                        <MailIcon
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Purple"
                        />
                        <input
                            id="email"
                            type="email"
                            placeholder="Email de Registro"
                            className="w-full p-3 px-10  border-gray-300 border placeholder:text-center"
                            {...register("email", {
                                required: "El Email es obligatorio",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message: "E-mail no válido",
                                },
                            })}
                        />
                    </div>
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label
                        className="font-normal text-2xl"
                    >Contraseña</label>
                    <div className="relative w-full">
                        <VpnKeyIcon
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Purple" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password de Registro"
                            className="w-full p-3 px-10  border-gray-300 border"
                            {...register("password", {
                                required: "El Password es obligatorio",
                            })}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-Purple"
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </button>
                    </div>

                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                    <Link
                        to={'/auth/forgot-password'}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </div>
                <div className="flex flex-col gap-5">
                    <input
                        type="submit"
                        value='Iniciar Sesión'
                        className=" bg-Yellow w-full p-3 font-black  text-xl cursor-pointer"
                    />
                    <Link
                        to={'/auth/register'}
                    >¿No tienes cuenta? Registrate</Link>
                </div>
            </form>
        </>
    )
}

export default Login
