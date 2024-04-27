import axios from 'axios'

const getAPI = axios.create({
    API_URL:'http://localhost:8000/',
    timeout: 6000,
})

export { getAPI }