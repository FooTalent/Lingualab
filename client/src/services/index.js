import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

export const login = async (userData) => {
    const loginUser = await axios.post(`${url}api/users/login`, userData)
    return loginUser.data
}

export const forgotPass = async (email) => {
    const forgotUserPass = await axios.post(`${url}api/users/userrecovery`, email)
    return forgotUserPass.data
}

export const register = async (userData) => {
    const newUser = await axios.post(`${url}api/users/register`, userData)
    return newUser.data
}

export const getClasses = async (idTeacher) => {
    const allTeacherClasses = await axios.post(url + 'api/' , idTeacher)
    return allTeacherClasses.data
}

export const newPass = async (password, token) => {
    const data = {
        password: password
      };
    const auth = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    const newPassword = await axios.put(`${url}api/users/userrecovery`, data, auth)
    return newPassword.data
}