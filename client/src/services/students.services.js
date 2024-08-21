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
    console.error('Error fetching students:', error);
    throw error;
  }
};

// obtener 1 estudiante
export const getStudentsById = async (token, idStudent) => {
  try {
    if (!idStudent) throw new Error('ID del estudiante no proporcionado');
    const response = await axios.get(`${url}api/users/students/${idStudent}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching student by ID:', error);
    throw error;
  }
};

// Actualizar estudiante de ese profesor (no te deja de otros)
export const updateStudent = async (token, idStudent, data) => {
  try {
    if (!idStudent) throw new Error('ID del estudiante no proporcionado');
    const response = await axios.put(`${url}api/users/students/${idStudent}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Invitacion alumno (solo email obligatorio)
export const inviteStudent = async (token, data) => {
  try {
    const response = await axios.post(`${url}api/users/inviteStudent`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error inviting student:', error);
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
    const response = await axios.get(`${url}api/reviews/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: filter,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
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
    console.error('Error creating review:', error);
    throw error;
  }
};

export const updateReviews = async (token, id, data) => {
  try {
    if (!id) throw new Error('ID de la reseña no proporcionado');
    const response = await axios.put(`${url}api/reviews/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
      console.error('Error updating review:', error);
    throw error;
  }
};

export const deleteReviews = async (token, id) => {
  try {
    if (!id) throw new Error('ID de la reseña no proporcionado');
    const response = await axios.delete(`${url}api/reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
