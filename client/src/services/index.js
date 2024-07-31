import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL


// USER SESSION ----------------------------------------------------------------
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
        `${url}api/users/google/login`,
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
      const handleMessage = (event) => {
  
        if (event.data && event.data.token) {
  
          // Limpia el listener
          window.removeEventListener('message', handleMessage);
  
          // Cierra la ventana emergente
          popup.close();
  
          // Resuelve la promesa con el token
          resolve({ token: event.data.token });
        }
      };
    
      window.addEventListener('message', handleMessage, false);
      })
    }catch (error) {
    console.error('Error during Google authentication:', error);
  }
};

  
// USER PROFILE ----------------------------------------------------------------
export const getUserData = async (token) => {
  try {
      const response = await axios.get(`${url}api/users/current`, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data.data;
  } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
  }
};