import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ErrorMessage from "../../components/ErrorMessage";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAppStore } from "../../store/useAppStore";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { Toast } from '../../utils/toast';
import { Link, useNavigate } from 'react-router-dom';

export default function NewPassword() {
    const navigate = useNavigate()
    const initialValues = {
        password: '',
        rPassword: '',
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const currentUrl = window.location.href
    const parsedUrl = new URL(currentUrl);
    const token = parsedUrl.searchParams.get('token');
    const { newPassword, change } = useAppStore()
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };

    const handlePassword = async (formData) => {
        const { password, rPassword } = formData
        if (password === rPassword) {
            await newPassword(password, token)
            if (change) {
                navigate("/auth/login");
            }
        }
        Toast.fire({
            title: "Las contraseñas deben ser iguales",
            icon: "error"
        })
        reset()
    }
    return (

        <>
            <form
                onSubmit={handleSubmit(handlePassword)}
                className="space-y-2"
                noValidate
            >
                <div className="flex flex-col gap-2">
                    <label>Contraseña</label>
                    <div className="relative w-full">
                        <VpnKeyIcon
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Purple" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nueva contraseña"
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
                </div>
                <div className="flex flex-col gap-2">
                    <label>Repetir contraseña</label>
                    <div className="relative w-full">
                        <VpnKeyIcon
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-Purple" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password de Registro"
                            {...register("rPassword", {
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
                </div>
                <input
                    type="submit"
                    value='Cambiar contraseña'
                    className="inputSubmit"
                />
            </form>
            <Link
                to={'/auth/login'}
                className='link'
            >Volver al inicio</Link>
        </>
    )
}
