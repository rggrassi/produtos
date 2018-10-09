import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria'

class Produtos extends Component {

    componentDidMount() {
        this.props.loadCategorias();
    }

    renderCategoria = cat => {
        return (
            <li key={cat.id}>
                <Link to={`/produtos/categorias/${cat.id}`}>{cat.categoria}</Link>   
                <button onClick={() => this.props.removeCategoria(cat)} className='btn btn-sm'> 
                    <span className='glyphicon glyphicon-remove'></span>
                </button>
                <button onClick={() => this.props.removeCategoria(cat)} className='btn btn-sm'> 
                    <span className='glyphicon glyphicon-pencil'></span>
                </button>
            </li>
        )
    }

    handleNewCategoria = async key => {
        if (key.keyCode === 13) { 
            this.props.createCategoria({ categoria: this.refs.categoria.value })
            this.refs.categoria.value = '';
        }
    } 

    render() {
        const { match, categorias } = this.props;
        return (
            <div className='row'> 
                <div className='col-md-2'>
                    <h3>Categorias</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
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