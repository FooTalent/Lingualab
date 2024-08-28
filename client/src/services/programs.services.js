import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_URL

// --------------- DISEÑO DE CLASES ---------------------------
// ------------------------------------------------------------
// PROGRAMS ( programs  --> pasar query: isTemplate = true) ----------------------------------------------------------------

export const getPrograms = async (token, teacherId) => {
  try {
    const response = await axios.get(`${url}api/programs/?isTemplate=true&teacherId=${teacherId}`, {
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

export const createProgram = async (token, teacherId, data) => {
  try {
    const newProgram = { ...data, teacher: teacherId}
    const response = await axios.post(`${url}api/programs`, newProgram, {
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

export const getProgramById = async (token, programId) => {
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

export const updateProgram = async (token, programId, data ) => {
  try {
    const response = await axios.put(`${url}api/programs/${programId}`, data, {
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

export const duplicateProgram = async (token, programId) => {
  try {
    const response = await axios.post(`${url}api/virtual/duplicate/${programId}`, {}, {
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

export const deleteProgram = async (token, programId) => {
  try {
    const response = await axios.delete(`${url}api/programs/${programId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Acceso no autorizado - talvez token invalido');
    }
    throw error
  }
}

// PROGRANS CLASS  ( class     --> pasar query: isTemplate = true) ----------------------------------------------------------------
export const getClassById = async (token, classId) => {
  try {
    const response = await axios.get(`${url}api/classes/${classId}`, {
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

export const createClass = async (token, data) => {
  try {
    const response = await axios.post(`${url}api/classes`, data, {
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

export const updateClass = async (token, classroomId, data ) => {
  try {
    const response = await axios.put(`${url}api/classes/${classroomId}`, data, {
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

export const deleteClass = async (token, classId) => {
  try {
    const response = await axios.delete(`${url}api/classes/${classId}`, {
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

export const getVCRooms = async (token, teacherId) => {
  try {
    const response = await axios.get(`${url}api/programs/?isTemplate=false&teacherId=${teacherId}`, {
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

export const createVCRoom = async (token, teacherId, data) => {
  try {
    
    console.log("data: ",data);
    
    const newClassRoom = { 
      ...data, 
      teacher: teacherId,
      first_class: new Date(data.first_class).toISOString(),
      startDate: new Date(data.startDate).toISOString()
    };
    console.log("newClassRoom: ",newClassRoom);
    const response = await axios.post(`${url}api/virtual`, newClassRoom, {
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

// CLASS     ( class     --> x defecto --> isTemplate = false) ----------------------------------------------------------------

export const getClassesByTeacherAndDate= async (token, teacherId, date ) => {
  try {
    const response = await axios.get(`${url}api/classes/calendar/get?teacherId=${teacherId}${date ? '&'+date : ''}`, {
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

export const getNextNClassesByTeacher= async (token, limit ) => {
  try {
    const textlimit = limit ? "?limit="+limit : ''
    const response = await axios.get(`${url}api/classes/calendar/next-clases${textlimit}`, {
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

// --------------- HOME ------------------
export const getCountPrograms = async (token, teacherId, isTemplate ) => {
  try {
    const response = await axios.get(`${url}api/programs/count/programs?techaerId=${teacherId}&isTemplate=${isTemplate}`, {
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
export const getHourlyLoad = async (token ) => {
  try {
    const response = await axios.get(`${url}api/programs/count/hourlyLoad`, {
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