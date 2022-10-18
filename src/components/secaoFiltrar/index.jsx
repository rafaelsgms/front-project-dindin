import './style.css'
import conexaoApi from "../../services/conexaoApi";
import { getItem } from "../../storage";
import { useState, useEffect } from "react";


export default function Filter({ transacoes, setTransacoes, getRegistros }) {
    const [categories, setCategories] = useState([])
    const [originalTransactions, setOriginalTransactions] = useState([])
    const [filtered, setFiltered] = useState(false);

    const token = getItem('token')

    useEffect(() => {
        setOriginalTransactions(transacoes)
        listCategories()
        setFiltered()
    }, [])

    async function listCategories() {
        try {
            const response = await conexaoApi.get('/categoria', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const newResponse = []
            response.data.forEach((e) => {
                newResponse.push({
                    id: e.id,
                    descricao: e.descricao,
                    clicado: false
                })
            })

            setCategories(newResponse)
        } catch (error) {
            console.log(error)
        }
    }

    function addCategories(categoria) {
        const localCategories = [...categories]
        const clickedCategorie = localCategories.find((e) => {
            return e.id === categoria.id
        })
        clickedCategorie.clicado = !clickedCategorie.clicado

        setCategories(localCategories)

    }

    function cleanFilters() {
        listCategories()
        getRegistros()
    }

    function applyFilters() {
        const notCliclkedCategories = categories.find((e) => {

            return e.clicado === true
        })

        if (!notCliclkedCategories) {
            return
        }

        const newTransactions = []

        const cliclkedCategories = categories.filter((e) => {

            return e.clicado === true
        })

        cliclkedCategories.forEach((e) => {
            originalTransactions.forEach((transacao) => {
                if (transacao.categoria_id === e.id) {
                    newTransactions.push(transacao)
                }
            })
        })

        setTransacoes(newTransactions)
    }

    return (
        <div className="box-filter-container">
            <div className="filter-container">
                <h4 className='filter-text'>Categoria</h4>
                <div className="list-categories-all">
                    <div className="list-categories">
                        {categories.map((categoria) => (
                            <div className={`filter-items ${filtered ? 'filter-items-active' : ''}`}
                                onClick={() => addCategories(categoria)}
                                key={categoria.id}
                            >
                                {categoria.descricao}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="btn-filters">
                    <button className="clean-btn"
                        onClick={cleanFilters}
                    >
                        Limpar Filtros
                    </button>
                    <button className="apply-filters"
                        onClick={applyFilters}
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
            <div className="filter-container-rside"></div>
        </div>
    )
}