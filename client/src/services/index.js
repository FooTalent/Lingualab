import axios from 'axios';
const url = import.meta.env.VITE_BACKEND_URL

// USER SESSION ----------------------------------------------------------------
export const register = async (userData) => {
  const newUser = await axios.post(`${url}api/users/register`, userData)
  return newUser.data
}

export const login = async (userData) => {
  const loginUser = await axios.post(`${url}api/users/login`, userData)
  return loginUser.data
}

export const forgotPass = async (email) => {
  const forgotUserPass = await axios.post(`${url}api/users/userrecovery`, email)
  return forgotUserPass.data
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
          window.removeEventListener('message', handleMessage);

          popup.close();

          resolve({ token: event.data.token });
        } else if (event.data && event.data.error) {
          window.removeEventListener('message', handleMessage);
          popup.close();
          resolve(false);
        }
      };

      const popupInterval = setInterval(() => {
        if (popup.closed) {
          clearInterval(popupInterval);
          window.removeEventListener('message', handleMessage);
          resolve(false);
        }
      }, 1000);

      window.addEventListener('message', handleMessage, false);
    });
  } catch (error) {
    console.error('Error during Google authentication:', error);
    return false;
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

export const userUpdate = async (token, userData) => {
  const data = {
    updateUser: { ...userData }
  };
  const auth = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await axios.put(`${url}api/users/current/update`, data, auth);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

export const userUpdatePhoto = async (token, photo) => {
  const formData = new FormData();
  formData.append('photo', photo);
  const auth = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }
  try {
    const response = await axios.put(`${url}api/users/current/uploadphoto`, formData, auth);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la imagen:', error);
    return null;
  }
};

// GET VALUES ----------------------------------------------------------------
export const getCountries = async () => {
  try {
    const response = await axios.get(`${url}api/values/countries`);
    return response.data;
  } catch (error) {
    console.error('Error consiguiendo los paises:', error);
    return null;
  }
};

export const getLanguages = async () => {
  try {
    const response = await axios.get(`${url}api/values/languages`);
    return response.data;
  } catch (error) {
    console.error('Error consiguiendo los idiomas:', error);
    return null;
  }
};