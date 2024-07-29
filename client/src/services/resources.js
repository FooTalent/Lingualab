import axios from 'axios'

const url = import.meta.env.VITE_BACKEND_URL

export const postResource = async (resource) => {
    const newResource = await axios.post(`${url}api/resources`, resource)
    return newResource.data
}