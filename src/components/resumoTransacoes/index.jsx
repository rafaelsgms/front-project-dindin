import './styles.css'
import conexaoApi from '../../services/conexaoApi';
import { useState, useEffect } from 'react'



export default function ResumoTransacoes() {
    const [entry, setEntry] = useState('')
    const [out, setOut] = useState('')
    const [balance, setBalance] = useState('')

    useEffect(() => {
        loadSummary()
    }, [])




    async function loadSummary() {
        const token = getItem('token');
        function getItem(key) {
            return localStorage.getItem(key);
        }
        try {
            const response = await conexaoApi.get('/transacao/extrato', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            setEntry(response.data.entrada)
            setOut(response.data.saida)
            setBalance(Number(response.data.entrada) - Number(response.data.saida))



        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (


        <div className="summary-info">
            <h3>Resumo</h3>
            <div>
                <table>
                    <thead>
                        <tr className='entries'>
                            <th>Entradas</th>
                            <th>R$ {`${(entry / 100).toFixed(2)}`}</th>
                        </tr>
                        <tr className='exits'>
                            <th>Saídas</th>
                            <th >R$ {`${(out / 100).toFixed(2)}`}</th>
                        </tr>
                        <tr className='balance'>
                            <th>Saldo</th>
                            <th>R$ {`${(balance / 100).toFixed(2)}`}</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>


    )


}

