import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

export const getStudents = async (token, idTeacher) => {
  try {
    const response = await axios.get(`${url}api/users/students/${idTeacher}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};