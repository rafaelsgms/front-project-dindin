import './style.css'
import Logo from '../../assets/Logo.png'
import conexaoApi from '../../services/conexaoApi';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getItem, setItem } from '../../storage';

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    senha: ''

  })

  function inputValues(e) {
    setForm({
      ...form, [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.email || !form.senha) {
      return
    }
    const response = await conexaoApi.post('/login', { ...form });
    const { token, usuario } = response.data
    setItem('token', token)
    setItem('usuario', usuario.nome)

    navigate('/home');
  };

  return (
    <>
      <div className='container'>
        <div className='card'>
          <header>
            <img src={Logo} alt="logo" />
          </header>
          <div className='card-left'>
            <h1>Controle suas <strong>finanças</strong>, sem planilha chata.</h1>
            <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
            <NavLink className='card-left-button'
              to='/cadastro'
            >
              Cadastre-se
            </NavLink>
          </div>
          <div className='card-right'>
            <div className='login'>
              <h1 className='loginquote'>Login</h1>
              <form onSubmit={handleSubmit}>
                <label>E-mail</label>
                <input onChange={inputValues}
                  type="text"
                  name="email"
                  value={form.email}
                />
                <label>Password</label>
                <input onChange={inputValues}
                  type="password"
                  name='senha'
                  value={form.senha}
                />
                <button className='card-right-button'
                >
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

