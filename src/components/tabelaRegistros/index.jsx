import './styles.css';
import { useState } from 'react'
import { format } from 'date-fns';
import api from '../../services/conexaoApi'
import iconEdit from '../../assets/icons8-editar-3.png'
import iconDelete from '../../assets/icons8-lixo.png'
import loadTransactions from '../../utils/loadTransactions';
import ModalEdtRegistro from '../modalTransacoes/modalEditaTransacao';



export default function TabelaTransacoes({ transactions, setTransactions }) {
    const [currentItem, setCurrentItem] = useState(null)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [transactionModal, setTransactionModal] = useState({})

    function handleOpenModal(transact) { setIsOpen(true); setTransactionModal({ ...transact }) }

    function handleCloseModal() { setIsOpen(false) }




    const weekDays = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];

    async function handleDeleteItem() {
        try {
            await api.delete(`/transacao/${currentItem.id}`)

            const allTransaction = await loadTransactions();
            setTransactions([...allTransaction]);
        } catch (error) {
            console.log(error.response)
        }

    }

    return (
        <>

            <div className='table'>

                <div>
                    {transactions.map((transact) => (
                        <div className='table-rows' key={transact.id}>
                            <span className='table-rows-date'>{format(new Date(transact.data), "dd/MM/yyyy")}</span>
                            <span >{weekDays[new Date(transact.data).getDay()]}</span>
                            <span >{transact.descricao}</span>
                            <span >{transact.categoria_nome}</span>
                            <strong
                                className={transact.tipo === 'entrada'
                                    ? 'positive-value' : 'negative-value'} >
                                R$ {`${(transact.valor / 100).toFixed(2)}`}
                            </strong>
                            <div >
                                <img src={iconEdit} alt='edit' className='icon-btn'
                                    onClick={() => handleOpenModal(transact)}
                                />
                                <img src={iconDelete} alt='delete' className='icon-btn'
                                    onClick={() => handleDeleteItem(transact)}
                                />
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <ModalEdtRegistro
                modalIsOpen={modalIsOpen}
                handleCloseModal={handleCloseModal}
                loadTransactions={loadTransactions}
                transactions={transactionModal}
            />
        </>
    )
}
