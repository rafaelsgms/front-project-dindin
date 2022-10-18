import './style.css'
import Logo from '../../assets/Logo.png'
import Vector from '../../assets/Vector.png'
import ProfileAvatar from '../../assets/ProfileAvatar.png'
import Filtro from '../../assets/icons8-filtro-48 1.png'
import { NavLink } from 'react-router-dom';
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import api from '../../services/conexaoApi'
import { getItem } from '../../storage'
import CabecalhoTabela from '../../components/tabelaRegistros/cabecalhoTabela'
import TabelaTransacoes from '../../components/tabelaRegistros'
import ResumoTransacoes from '../../components/resumoTransacoes'
import ModalAddRegistro from '../../components/modalTransacoes'
import ModalEditaUsuario from '../../components/modalEditaUsuario'
import Filter from '../../components/secaoFiltrar'





Modal.setAppElement('#root')

export default function Main() {
    const token = getItem('token')
    const headers = {
        Authorization: `Bearer ${token}`
    }

    const [usuario, setUsuario] = useState({})

    const [modalIsOpen, setIsOpen] = useState(false)

    function handleOpenModal() { setIsOpen(true) }
    function handleCloseModal() { setIsOpen(false) }

    const [avatarIsOpen, setAvatarIsOpen] = useState(false)
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState(false)

    function handleOpenModalAvatar() { setAvatarIsOpen(true) }
    function handleCloseModalAvatar() { setAvatarIsOpen(false) }

    useEffect(() => {
        user()
    }, [])


    useEffect(() => {
        loadTransactions()
    }, [])

    async function loadTransactions() {

        try {
            const response = await api.get('/transacao', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTransactions(response.data);

        } catch (error) {
            console.log(error.response.data)
        }
    }

    async function user() {
        try {

            const response = await api.get('/usuario', { headers });
            setUsuario(response.data)

        } catch (error) {

        }
    }

    return (
        <div className='container-main'>
            <div className='header'>
                <img src={Logo} alt="logo"
                />
                <div className='logo-main'>
                    <img src={ProfileAvatar}
                        alt='avatar'
                        onClick={handleOpenModalAvatar}
                    />

                    <ModalEditaUsuario
                        avatarIsOpen={avatarIsOpen}
                        handleCloseModalAvatar={handleCloseModalAvatar}
                    />

                    <span>{usuario.nome}</span>
                    <NavLink to="/" className='profile'>
                        <img src={Vector} alt="profile" />
                    </NavLink>
                </div>
            </div>
            <section className='section-main'>
                <button className='filtrar-btn'
                    onClick={() => setFilter(!filter)}
                >
                    <img src={Filtro} alt="filtrar" />
                    Filtrar
                </button>
                {filter && (
                    <Filter
                        transacoes={transactions}
                        setTransacoes={setTransactions}
                        getRegistros={loadTransactions}
                    />
                )}
                <div className='table'>
                    <div className='table-left'>
                        <CabecalhoTabela />
                        <TabelaTransacoes
                            transactions={transactions} />
                    </div>
                    <div className='table-right'>

                        <div className='summary'>
                            <ResumoTransacoes />
                        </div>

                        <button
                            className='adc-register'
                            onClick={handleOpenModal}>
                            Adicionar Registro
                        </button>

                        <ModalAddRegistro
                            modalIsOpen={modalIsOpen}
                            handleCloseModal={handleCloseModal}
                            loadTransactions={loadTransactions}
                            transactions={transactions}
                        />
                    </div>
                    <div className='table-right2'></div>
                </div>
            </section>
        </div>
    )
}