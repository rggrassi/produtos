import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria'
import axios from 'axios';

const url ='http://localhost:3001/categorias';

class Produtos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categorias: []
        }
    }

    componentDidMount() {
        this.loadCategorias();
    }

    renderCategoria(cat) {
        return (
            <li key={cat.id}>
                <Link to={`/produtos/categorias/${cat.id}`}>{cat.categoria}</Link>   
            </li>
        )
    }

    handleNewCategoria = async (key) => {
        if (key.keyCode === 13) { 
            await axios.post(url, { categoria: this.refs.categoria.value });
            this.loadCategorias();
            this.refs.categoria.value = '';
        }
    } 

    loadCategorias = async () => {
        const res = await axios.get(url);
        this.setState({ categorias: res.data });   
    }

    render() {
        const { match } = this.props;
        const { categorias } = this.state;
        return (
            <div className='row'> 
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul>
                        { categorias.map(this.renderCategoria) }
                    </ul>
                    <div className='well well-sm'>
                        <input className='form-control'
                            onKeyUp={this.handleNewCategoria}
                            type="text"
                            ref='categoria'
                            placeholder='Nova categoria'
                        >
                        </input>
                    </div>
                </div>
                <div className='col-md-10'>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={`${match.url}/categorias/:catId`} component={Categoria} />
                </div>
            </div>
        )
    }
}

export default Produtos;