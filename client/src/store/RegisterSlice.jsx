import { useNavigate } from "react-router-dom";
import { register } from "../services";
import { Toast } from "../utils/toast";

export const createRegisterSlice = (set, get) => ({
    user: {},
    status: false,
    userRegister: async (userData) => {
        const navigate = useNavigate()
        const registerUser = await register(userData)

        if(!registerUser.isError){
            Toast.fire({
                title: registerUser.message,
                icon: "success"
            })
            .then(() => {
                navigate('/auth/login')
            })

        } else {
            Toast.fire({
                title: registerUser.message,
                icon: 'error'
            })

            return false
        }



    }
})