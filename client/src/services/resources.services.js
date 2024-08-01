import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL

export const fetchResources = async (token) => {
    const response = await axios.get(`${url}api/resources`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const fetchResourcesWithFilter = async (token, filter) => {
    const response = await axios.get(`${url}api/resources/?${filter}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return response.data;
}

export const postResource = async (resource, token) => {
    const newResource = await axios.post(`${url}api/resources`, resource, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return newResource.data
}

export const deleteResource = async (id, token) => {
    const response = await axios.delete(`${url}api/resources/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return response.data
}