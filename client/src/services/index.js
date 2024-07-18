import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

export const login = async (userData) => {
    const loginUser = await axios.post(`${url}api/users/login`, userData)
    return loginUser.data
}

export const forgotPass = async (email) => {
    const forgotUserPass = await axios.post(`${url}api/users/userrecovery`, email)
    console.log(forgotUserPass)
}

export const register = async (userData) => {
    const newUser = await axios.post(url + 'api/users/register', userData)
    return newUser.data
}