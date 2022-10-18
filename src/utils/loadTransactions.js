
import api from '../services/conexaoApi'


export default async function loadTransactions() {
    const token = getItem('token');
    function getItem(key) {
        return localStorage.getItem(key);
    }
    try {
        const response = await api.get('/transacao', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;

    } catch (error) {
        console.log(error.response.data)
    }
}