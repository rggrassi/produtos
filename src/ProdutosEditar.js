import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class ProdutosEditar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }

    componentDidMount() {
        this.readProduto();
    }

    readProduto = async () => {
        const res = await this.props.readProduto(this.props.match.params.id);
        this.refs.produto.value = res.data.produto;
        this.refs.categoria.value = res.data.categoria;
    }

    handleEditProduto = async () => {
        const produto = {
            id: this.props.match.params.id,
            produto: this.refs.produto.value,
            categoria: this.refs.categoria.value
        }

        await this.props.editProduto(produto);
        this.setState({ redirect: `/produtos/categorias/${produto.categoria}` })
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div>
                <h2>Editar Produto</h2>
                <input 
                    className='form-control' 
                    placeholder='Nome'
                    ref='produto'
                />
                <select className='form-control' ref='categoria'>
                    {this.props.categorias.map(c => <option key={c.id} value={c.id}>{ c.categoria }</option>)}
                </select>
                <button onClick={this.handleEditProduto} className='btn btn-primary'>Salvar</button>            
            </div>
        )
    }
}

export default ProdutosEditar;