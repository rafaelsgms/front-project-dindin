import './style.css'
import { useState, useEffect } from 'react'
import api from '../../services/conexaoApi'
import { toast } from 'react-toastify';
import CloseIcon from '../../assets/close.png'
import Modal from 'react-modal'



export default function ModalAddRegistro({ modalIsOpen, handleCloseModal, loadTransactions, editRecord, transaction }) {

    const errorMessage = (message) => {
        toast.error(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            theme: 'colored',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const sucessMessage = (mensagem) => {
        toast.success(mensagem, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            theme: 'colored',
            closeOnClick: true,
            pauseOnHover: false,
        })
    }

    function getItem(key) {
        return localStorage.getItem(key);
    }


    const token = getItem('token');

    const [tipo, setTipo] = useState('entrada');
    const [categoria, setCategoria] = useState([]);


    const clearForm = {
        descricao: '',
        valor: '',
        data: '',
        categoria: '0'
    }

    function handleClearForm() {
        setForm({ ...clearForm })
    }


    const [form, setForm] = useState({
        descricao: '',
        valor: '',
        data: '',
        categoria: '0'
    })

    function inputValues(e) {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const dataTransaction = {
            descricao: form.descricao,
            data: form.data,
            valor: form.valor,
            categoria_id: form.categoria,
            tipo
        }


        try {
            const response = await api.post(`/transacao`, dataTransaction, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            if (!form.valor || !form.categoria_id || !form.data) {
                return errorMessage('Preencha todos os campos.');
            }

            if (response.status > 204) {
                return errorMessage(response.data);
            }

            sucessMessage('Registro realizado!')
            loadTransactions()
            modalIsOpen(handleCloseModal);
            handleClearForm()

        } catch (error) {
            errorMessage(error.response.data);
        }



    }

    async function handleCategories() {
        try {
            const response = await api.get(`/categoria`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            setCategoria([...response.data])
        } catch (error) {
            errorMessage(error.response.data)
        }
    }

    useEffect(() => {
        handleCategories();
    }, []);

    return (

        <Modal className='container-modal-addRegistro '
            isOpen={modalIsOpen}
            onRequestClose={handleCloseModal}
        >
            <div className='modal-addRegistro'>
                <div className='modal-header'>
                    <h1>Adicionar Registro</h1>

                    <img src={CloseIcon}
                        alt="close icon"
                        onClick={handleCloseModal}
                    />
                </div>

                <div className='modal-btns'>
                    <button
                        className={tipo === 'entrada' ? 'btn-entry' : 'btn-option'}
                        onClick={() => setTipo('entrada')}
                    >
                        Entrada
                    </button>
                    <button
                        className={tipo === 'saida' ? 'btn-exit' : 'btn-option'}
                        onClick={() => setTipo('saida')}

                    >
                        Saída
                    </button>
                </div>

                <form onSubmit={handleSubmit}>

                    <label htmlFor="">Valor</label>
                    <input onChange={inputValues}
                        type='Number'
                        name="valor"
                        value={form.valor}
                    />
                    <label htmlFor="">Categoria</label>

                    <select
                        name="categoria"
                        value={form.categoria_id}
                        onChange={inputValues}>

                        <option value=''></option>
                        {categoria.map((item) => (
                            <option key={item.id}
                                value={item.id}>
                                {item.descricao}
                            </option>
                        ))};
                    </select>

                    <label htmlFor="">Data</label>
                    <input onChange={inputValues}
                        type='date'
                        name="data"
                        value={form.data}
                    />
                    <label htmlFor="">Descrição</label>
                    <input onChange={inputValues}
                        type='text'
                        name="descricao"
                        value={form.descricao}
                    />
                    <button
                        className='confirm-btn'

                    >
                        Confirmar
                    </button>
                </form>
            </div>

        </Modal>

    )
}