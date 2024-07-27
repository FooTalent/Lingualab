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
    const allTeacherClasses = await axios.get(`${url}api/classroom/${idTeacher}`)
    return allTeacherClasses
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

export const googleLoginUser = async () => {
    try {
      const popup = window.open(
        `${url}auth/google`,
        "targetWindow",
        `toolbar=no,
          location=no,
          status=no,
          menubar=no,
          scrollbars=yes,
          resizable=yes,
          width=620,
          height=700`
      );
      return new Promise((resolve) => {
        window.addEventListener("message", (event) => {
          if (event.origin === `${url}` && event.data) {
            popup.close();
            resolve({ data: event.data });
          }
        });
      });
    } catch ({ response }) {
      return { error: response };
    }
  };

export const getUserData = async () => {
    const userData = await axios.get(`${url}api/users/current`)
    return userData.data
}