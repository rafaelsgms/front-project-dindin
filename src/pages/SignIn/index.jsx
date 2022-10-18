import './style.css'
import conexaoApi from '../../services/conexaoApi'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../assets/Logo.png'
import { useState } from 'react';

export default function SignIn() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmaSenha: ''
    })

    function inputValues(e) {
        setForm({
            ...form, [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault()
        if (!form.nome || !form.email || !form.senha || !form.confirmaSenha) {
            return
        }
        const response = await conexaoApi.post('/usuario', { ...form });
        navigate('/');
    };

    return (
        <>
            <div className='container'>
                <header>
                    <img src={Logo} alt="logo" />
                </header>
                <div className='card-signin'>
                    <h1>Cadastre-se</h1>
                    <form onSubmit={handleSubmit}>
                        <label>Nome</label>
                        <input onChange={inputValues}
                            type="text"
                            name="nome"
                            value={form.nome}

                        />
                        <label>E-mail</label>
                        <input onChange={inputValues}
                            type="text"
                            name='email'
                            value={form.email}
                        />
                        <label>Senha</label>
                        <input onChange={inputValues}
                            type="password"
                            name='senha'
                            value={form.senha}
                        />
                        <label>Confirmação de senha</label>
                        <input onChange={inputValues}
                            type="password"
                            name='confirmaSenha'
                            value={form.confirmaSenha}
                        />
                        <button
                            className='btn-signin'
                        >Cadastrar
                        </button>
                    </form>
                    <Link className='link' to='/'>Já tem cadastro? Clique aqui!</Link>
                </div>
            </div>

        </>
    );
}