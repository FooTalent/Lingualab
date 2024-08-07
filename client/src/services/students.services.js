import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

// Estudiantes del profesor
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

// obtener 1 estudiante
export const getStudentsById = async (token, idStudent) => {
  try {
    const response = await axios.get(`${url}api/users/students/${idStudent}`, {
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

// Actualizar estudiante de ese profesor (no te deja de otros)
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

// Invitacion alumno (solo email obligatorio)
export const ginviteStudent = async (token, email, first_name, last_name, password) => {
  const data = {email}
  if (first_name) data.first_name = first_name;
  if (last_name)  data.last_name = last_name;
  if (password)   data.password = password;

  try {
    const response = await axios.get(`${url}api/users/students/`, data, {
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
    const response = await axios.get(`${url}api/reviews/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: data,
    });
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
    const response = await axios.post(`${url}api/reviews/`, data, {
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

export const updateReviews = async (token, id, data) => {
  try {
    const response = await axios.put(`${url}api/reviews/${id}`, data, {
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

export const deleteReviews = async (token) => {
  try {
    const response = await axios.delete(`${url}api/reviews/${id}`, {
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
