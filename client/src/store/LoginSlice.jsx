import { login } from "../services";
import { Toast } from "../utils/toast";

export const createUserSlice = (set, get) => ({
    user: {},
    status: false,
    userLogin: async (userData) => {
        const loginUser = await login(userData)
        if (loginUser.access === true) {
            set(() => ({
                status: true,
                user: userData
            }))
            Toast.fire({
                title: "Bienvenido",
                icon: "success"
            })
            localStorage.setItem('status', JSON.stringify(get().status))
        } else {
            if (loginUser.info === 'User not found') {
                Toast.fire({
                    title: "El usuario no existe",
                    icon: "error"
                })
            } else {
                Toast.fire({
                    title: "Contraseña incorrecta",
                    icon: "error"
                })
            }
        }
    },
    loguot: () => {
        set(() => ({
            status: false,
            user: null
        }))
        Toast.fire({
            title: "Sesión finalizada",
            icon: "info"
        })
    },
    localLogin: () => {
        const storeLogin = localStorage.getItem('status')
        if (storeLogin) {
            set({
                status: JSON.parse(storeLogin)
            })
        }
    },
    userRegister: async (userData) => {
        const data = new FormData()

        Object.keys(userData).map((field) => {
            data.append(field, field)
        })

        // Falta agregar función para corroborar con back y en base a eso devolver respuesta

        Toast.fire({
            title: "Usuario creado con éxito",
            icon: "success"
        })
    }
})