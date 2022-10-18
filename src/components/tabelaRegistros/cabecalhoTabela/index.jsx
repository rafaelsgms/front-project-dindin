import './styles.css';
import IconeOrdCima from '../../../assets/icon-seta-ordenar-cima.svg';

function CabecalhoTabela() {
    return (
        <>

            <div className="titulo">

                <div className=" data">
                    <h4>Data</h4>
                    <img
                        src={IconeOrdCima}
                        alt='Seta pra cima'
                    />
                </div>
                <h4>Dia da semana</h4>
                <h4>Descrição</h4>
                <h4>Categoria</h4>
                <h4>Valor</h4>
                <h4></h4>


            </div>
        </>
    )
}

export default CabecalhoTabela;