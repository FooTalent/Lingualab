import { login } from "../services";
import { Toast } from "../utils/toast";

export const createUserSlice = (set, get) => ({
    user: {},
    status: false,
    userLogin: async (userData) => {
        const loginUser = await login(userData)
        console.log(loginUser)
        if (loginUser.isError === false) {
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
            Toast.fire({
                title: `${loginUser.message}`,
                icon: "error"
            })

        }
    },
    loguot: () => {
        set(() => ({
            status: false,
            user: null
        }))
        localStorage.setItem('status', JSON.stringify(get().status))
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
    }
})