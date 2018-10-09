import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Categoria extends Component {

    componentDidMount() {
        const id = this.props.match.params.catId;
        this.props.loadProdutos(id);
        this.props.readCategoria(id);
    }

    componentDidUpdate(prevProps) {        
        if (prevProps.match.params.catId !== this.props.match.params.catId) {
            this.props.loadProdutos(this.props.match.params.catId);
            this.props.readCategoria(this.props.match.params.catId);
        }
    }

    removeProduto = async produto => {
        await this.props.removeProduto(produto);
        this.props.loadProdutos(this.props.match.params.catId);
    }

    renderProduto = produto => (
        <p key={produto.id} className='well'>
            {produto.produto}
            <button onClick={() => this.removeProduto(produto)}>Excluir</button>
            <Link to={`/produtos/editar/${produto.id}`}>Editar</Link>
        </p>
    )
 
    render() {
        return (
            <div>
                <h1>{this.props.categoria.categoria}</h1>
                { this.props.produtos.length === 0 &&
                    <p className='alert alert-danger'>Nenhum produto.</p>        
                }
                {this.props.produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria;