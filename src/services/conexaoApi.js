import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3000",
    setTimeout: 10000,
    headers: { 'content-type': 'application/json' }
})