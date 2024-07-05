import { register } from "../services";
import { Toast } from "../utils/toast";

export const createRegisterSlice = (set, get) => ({
    user: {},
    status: false,
    userRegister: async (userData) => {
        const registerUser = await register(userData)

        Toast.fire({
            title: "Usuario creado con éxito",
            icon: "success"
        })

    }
})