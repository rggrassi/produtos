import React, { Component } from 'react';
import axios from 'axios';

class Categoria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            categoria: {}
        }
    }

    loadCategoria = async (id) => {
        const url = `http://localhost:3001/categorias/${id}`;
        const res = await axios.get(url);    
        this.setState({ categoria: res.data });
    }

    loadProdutos = async (id) => {
        const url = `http://localhost:3001/produtos?categoria=${id}`;
        const res = await axios.get(url);    
        this.setState({ produtos: res.data });
    }

    componentDidMount() {
        const id = this.props.match.params.catId;
        this.loadProdutos(id);
        this.loadCategoria(id);
    }

    componentDidUpdate(prevProps) {        
        if (prevProps.match.params.catId !== this.props.match.params.catId) {
            this.loadProdutos(this.props.match.params.catId);
            this.loadCategoria(this.props.match.params.catId);
        }
    }

    renderProduto = (produto) => (
        <p key={produto.id} className='well'>{produto.produto}</p>
    )

    render() {
        return (
            <div>
                <h1>{this.state.categoria.categoria}</h1>
                {this.state.produtos.map(this.renderProduto)}
            </div>
        )
    }
}

export default Categoria;