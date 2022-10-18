import './style.css'
import CloseIcon from '../../assets/close.png'
import Modal from 'react-modal'



export default function ModalEditaUsuario({ avatarIsOpen, handleCloseModalAvatar }) {

    return (

        <Modal className='modal-avatar'
            isOpen={avatarIsOpen}
            onRequestClose={handleCloseModalAvatar}
        >
            <div className='modal-addRegistro'>
                <div className='modal-header'>
                    <h1>Editar Perfil</h1>
                    <img src={CloseIcon}
                        alt="close icon"
                        onClick={handleCloseModalAvatar}
                    />
                </div>

                <form action="">
                    <label htmlFor="">Nome</label>
                    <input
                        type='text'
                        name="nome"
                    />
                    <label htmlFor="">E-mail</label>
                    <input
                        type='text'
                        name="email"
                    />
                    <label htmlFor="">Senha</label>
                    <input
                        type='password'
                        name="senha"
                    />
                    <label htmlFor="">Confirmar Senha</label>
                    <input
                        type='password'
                        name="confirmaSenha"
                    />
                    <button className='confirm-btn'>
                        Confirmar
                    </button>
                </form>
            </div>
        </Modal>

    )
}