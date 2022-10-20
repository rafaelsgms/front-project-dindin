import axios from 'axios';

export default axios.create({
    baseURL: "https://desafio-backend-03-dindin.herokuapp.com/",
    setTimeout: 10000,
    headers: { 'content-type': 'application/json' }
})