import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import ProdutosHome from './ProdutosHome';
import Categoria from './Categoria'
import ProdutosNovo from './ProdutosNovo';
import ProdutosEditar from './ProdutosEditar';

class Produtos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            editingCategoria: ''
        }
    }

    componentDidMount() {
        this.props.loadCategorias();
    }

    editCategoria = categoria => {
        this.setState({ editingCategoria: categoria.id })
    }

    cancelEditing = () => {
        this.setState({ editingCategoria: '' })
    }

    renderCategoria = cat => {
        return (
            <li key={cat.id}>
                { this.state.editingCategoria === cat.id &&
                    <div className='input-group'>
                        <div className='input-group-btn'>
                            <input ref={`cat-${cat.id}`} onKeyUp={this.handleEditCategoria} className='form-control' type='text' defaultValue={cat.categoria} />
                            <button onClick={this.cancelEditing} className='btn'>Cancelar</button>
                        </div>
                    </div>
                }    
                { this.state.editingCategoria !== cat.id && 
                    <div>
                        <Link to={`/produtos/categorias/${cat.id}`}>{cat.categoria}</Link>   
                        <button onClick={() => this.props.removeCategoria(cat)} className='btn btn-sm'> 
                            <span className='glyphicon glyphicon-remove'></span>
                        </button>
                        <button onClick={() => this.editCategoria(cat)} className='btn btn-sm'> 
                            <span className='glyphicon glyphicon-pencil'></span>
                        </button> 
                    </div>
                }
            </li>
        )
    }

    handleNewCategoria = async key => {
        if (key.keyCode === 13) { 
            this.props.createCategoria({ categoria: this.refs.categoria.value })
            this.refs.categoria.value = '';
        }
    } 

    handleEditCategoria = async key => {
        if (key.keyCode === 13) { 
            this.props.editCategoria({ 
                categoria: this.refs['cat-'+this.state.editingCategoria].value,
                id: this.state.editingCategoria 
            })
            this.setState({ editingCategoria: '' });
        }
    } 

    render() {
        const { match, categorias } = this.props;
        return (
            <div className='row'> 
                <div className='col-md-3'>
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
                    <Link to='/produtos/novo'>Novo produto</Link>
                </div>
                <div className='col-md-9'>
                    <Route exact path={match.url} component={ProdutosHome} />
                    <Route exact path={`${match.url}/novo`}
                        render={(props) => {
                            return (
                                <ProdutosNovo {...props} 
                                    categorias={categorias}
                                    createProduto={this.props.createProduto}
                                />
                            )    
                        }}
                    />
                    <Route path={`${match.url}/editar/:id`}
                        render={(props) => {
                            return (
                                <ProdutosEditar {...props}
                                    readProduto={this.props.readProduto}
                                    editProduto={this.props.editProduto}
                                    categorias={categorias}
                                />
                            )
                        }}                            
                    />
                    <Route exact path={`${match.url}/categorias/:catId`} 
                        render={(props) => {
                            return (
                                <Categoria {...props} 
                                    readCategoria={this.props.readCategoria}
                                    loadProdutos={this.props.loadProdutos}
                                    produtos={this.props.produtos} 
                                    categoria={this.props.categoria}  
                                    removeProduto={this.props.removeProduto}                                                                     
                                />
                            )
                        }} 
                    />
                </div>
            </div>
        )
    }
}

export default Produtos;