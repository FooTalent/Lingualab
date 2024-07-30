import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

// --------------- DISEÑO DE CLASES ---------------------------
// ------------------------------------------------------------
// PROGRAMS ( programs  --> pasar query: isTemplate = true) ----------------------------------------------------------------

export const fetchPrograms = async (token) => {
  try {
    const response = await axios.get(`${url}api/programs`, {
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

export const fetchProgramById = async (token, programId) => {
  try {
    const response = await axios.get(`${url}api/programs/${programId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};

// PROGRANS CLASS  ( class     --> pasar query: isTemplate = true) ----------------------------------------------------------------

export const createClassroom = async (data, token) => {
  try {
    const response = await axios.post(`${url}api/classroom`, data, {
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

export const fetchClassRoomById = async (token, classroomId) => {
  try {
    const response = await axios.get(`${url}api/classroom/${classroomId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};

export const updateClassroom = async (data, token, classroomId) => {
  try {
    const response = await axios.put(`${url}api/classroom/${classroomId}`, data, {
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
}

// TODO CLASS DETAIL ------------ESTO SE ROMPIO, NO EXISTE MAS----------------------------------------------------

export const createClassDetail = async (data, token) => {
  try {
    const response = await axios.post(`${url}api/classdetail/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};

export const fetchClassDetailList= async (token, teacherId) => {
  try {
    const response = await axios.get(`${url}api/classdetail/list/${teacherId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error;
  }
};

export const updateClassdetail = async (data, token, classdetailId) => {
  try {
    const response = await axios.put(`${url}api/classdetail/${classdetailId}`, data, {
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
}

// --------------- AULA VIRTUAL o CALENDARIO ------------------
// ------------------------------------------------------------
// PROGRAMS  ( programs  --> x defecto --> isTemplate = false) ----------------------------------------------------------------
// CLASS     ( class     --> x defecto --> isTemplate = false) ----------------------------------------------------------------