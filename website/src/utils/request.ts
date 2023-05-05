import axios from 'axios';

const requests = axios.create({
    timeout: 10000,
    baseURL: '/api'
})
export default requests