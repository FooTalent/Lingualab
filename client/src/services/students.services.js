import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

export const getStudents = async (token) => {
  try {
    const response = await axios.get(`${url}api/users/students/`, {
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
export const updateStudent = async (token, idStudent, data) => {
  try {
    const response = await axios.put(`${url}api/users/students/${idStudent}`, data, {
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



// Reviews ---------------------------------------------------------------
/* BODY:
student = id,
teacher = id
program = id
classes = id
score = calificacion a al 10
comment = comentarios (opcional) */

export const getReviews = async (token, filter) => {
  try {
    const data = filter 
    const auth = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.get(`${url}api/users/reviews/`, data, auth);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};

export const createReviews = async (token, data) => {
  try {
    const auth = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.post(`${url}api/users/reviews/`, data, auth);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};

export const updateReviews = async (token, id, data) => {
  try {
    const auth = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.put(`${url}api/users/reviews/${id}`, data, auth);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};

export const deleteReviews = async (token, data) => {
  try {
    const auth = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
      }
    }
    const response = await axios.delete(`${url}api/users/reviews/${id}`, auth);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};
