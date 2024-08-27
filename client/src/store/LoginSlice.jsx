import { forgotPass, getUserData, googleLoginUser, login, newPass } from "../services";
import { Toast } from "../utils/toast";

export const createUserSlice = (set, get) => ({
    user: {},
    userDetail: {},
    status: false,
    change: false,

    // user sessions
    userLogin: async (userData) => {
        const loginUser = await login(userData);
        if (!loginUser.isError) {
            set(() => ({
                status: true,
                user: { email: userData.email, token: loginUser.data.token }
            }));
            Toast.fire({
                title: "Bienvenido",
                icon: "success"
            });
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
            localStorage.setItem('status', JSON.stringify(get().status));
            localStorage.setItem('user', JSON.stringify(get().user));
        } else {
            Toast.fire({
                title: `${loginUser.message}`,
                icon: "error"
            });
        }
    },
    userLoginGoogle: async () => {
        const res = await googleLoginUser()

        if (res) {
            set(() => ({
                status: true,
                user: res
            }))
            Toast.fire({
                title: "Bienvenido",
                icon: "success"
            })
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
            localStorage.setItem('status', JSON.stringify(get().status))
            localStorage.setItem('user', JSON.stringify(get().user))
        } else {
            Toast.fire({
                title: "Error al iniciar sesión",
                icon: "error"
            })
        }
    },
    logout: () => {
        set(() => ({
            status: false,
            user: null,
            userDetail: null
        }));
        localStorage.removeItem('status');
        localStorage.removeItem('user');
        localStorage.removeItem('userDetail');
        Toast.fire({
            title: "Sesión finalizada",
            icon: "info"
        });
    },
    localLogin: () => {
        const storedStatus = localStorage.getItem('status')
        const storedUser = localStorage.getItem('user')
        const storedUserDetail = localStorage.getItem('userDetail')
        if (storedStatus) {
            set({
                status: JSON.parse(storedStatus),
                user: JSON.parse(storedUser),
                userDetail: JSON.parse(storedUserDetail),
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
    }
})