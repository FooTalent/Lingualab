import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

export const login = async (userData) => {
    const loginUser = await axios.post(`${url}api/users/login`, userData)
    console.log(loginUser.data)
    return loginUser.data
}

export const register = async (userData) => {
    const newUser = await axios.post(url + 'api/users/register', userData)
    return newUser.data
}