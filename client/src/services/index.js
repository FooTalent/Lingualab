import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

export const login = async (userData) => {
    console.log(userData)
    if(userData){
        const data = 
            {access: true,
             user: "valido"   
            }
            return data
    }

}

export const register = async (userData) => {
    const newUser = await axios.post(url + 'api/users/register', userData)

    return newUser.data
}