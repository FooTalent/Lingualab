import { forgotPass, getUserData, login, newPass } from "../services";
import { Toast } from "../utils/toast";

export const createUserSlice = (set, get) => ({
    user: {},
    userDetail: {},
    status: false,
    change: false,
    // user sessions
    userLogin: async (userData) => {
        const loginUser = await login(userData)

        if (loginUser.isError === false) {
            set(() => ({
                status: true,
                user: { email: userData.email, token: loginUser.data.token }
            }))
            Toast.fire({
                title: "Bienvenido",
                icon: "success"
            })
            localStorage.setItem('status', JSON.stringify(get().status))
            localStorage.setItem('user', JSON.stringify(get().user))
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
        const userLogin = localStorage.getItem('user')
        const userInfo = localStorage.getItem('userDetail')
        if (storeLogin) {
            set({
                status: JSON.parse(storeLogin),
                user: JSON.parse(userLogin),
                userDetail: JSON.parse(userInfo)
            })
        }
    },
    forgotPassword: async (email) => {
        const forgot = await forgotPass(email)
        if (forgot) {
            Toast.fire({
                title: "Revise su casilla de correo para restaurar contraseña",
                icon: "success"
            })
        }
    },
    newPassword: async (password, token) => {
        console.log(password, token)
        const newP = await newPass(password, token)
        if (newP) {
            Toast.fire({
                title: "Se modifico la contraseña correctamente",
                icon: "success"
            })
            set(() => ({
                change: true
            }))
        }
    },

    // user profile
    fetchCurrentUser: async () => {
        const { token } = get().user;
        if (token) {
            try {
                const userData = await getUserData(token);
                if (userData) {
                    set(() => ({
                        userDetail: { ...userData }
                    }));
                    localStorage.setItem('userDetail', JSON.stringify(get().userDetail));
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    },
})