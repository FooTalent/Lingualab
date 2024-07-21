
import { register } from "../services";
import { Toast } from "../utils/toast";

export const createRegisterSlice = (set) => ({
    complete: false,
    userRegister: async (userData) => {
        const registerUser = await register(userData)
        console.log(registerUser)
        if (!registerUser.isError) {
            Toast.fire({
                title: registerUser.message,
                icon: "success"
            })
            set(() => ({
                complete: true
            }))
        } else {
            Toast.fire({
                title: registerUser.message,
                icon: 'error'
            })
        }
    }
})