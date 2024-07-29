import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

// PROGRMAS ----------------------------------------------------------------

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

// CLASS ROOM ----------------------------------------------------------------

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

// CLASS DETAIL ----------------------------------------------------------------

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