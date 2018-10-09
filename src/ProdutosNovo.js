import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProdutosNovo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false
        }
    }

    handleNewProduto = async () => {
        const produto = {
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }

        await this.props.createProduto(produto);
        this.setState({ redirect: `/produtos/categorias/${produto.categoria}` })
    }

    render() {
        const { categorias } = this.props;
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div> 
                <h2>Novo Produto</h2>
                <input 
                    className='form-control' 
                    placeholder='Nome'
                    ref='produto'
                />
                <select className='form-control' ref='categoria'>
                    {categorias.map(c => <option key={c.id} value={c.id}>{ c.categoria }</option>)}
                </select>
                <button onClick={this.handleNewProduto} className='btn btn-primary'>Salvar</button>
            </div>
        )
    }
}

export default ProdutosNovo;
