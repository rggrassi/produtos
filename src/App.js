import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Sobre from './Sobre';
import Produtos from './Produtos'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categorias: [],
      produtos: [],
      categoria: {}
    }
  }

  readCategoria = async categoria => {
    const res = await this.props.api.readCategoria(categoria);   
    this.setState({ categoria: res.data }) 
  }

  loadCategorias = async () => {
    const res = await this.props.api.loadCategorias();
    this.setState({ categorias: res.data });   
  }

  removeCategoria = async categoria => {
    await this.props.api.deleteCategoria(categoria.id);
    this.loadCategorias();
  }
  
  createCategoria = async categoria => {
    await this.props.api.createCategoria(categoria);
    this.loadCategorias();
  }

  editCategoria = async categoria => {
    await this.props.api.editCategoria(categoria);
    this.loadCategorias();
  }

  createProduto = produto => {
    return this.props.api.createProduto(produto);
  }

  loadProdutos = async categoria => {
    try {
      const res = await this.props.api.loadProdutos(categoria);
      this.setState({ produtos: res.data });
    } catch (e) {
      console.log("Erro: ", e);
    }
  }

  removeProduto = produto => {
    return this.props.api.deleteProduto(produto.id)
  }

  readProduto = id => {
    return this.props.api.readProduto(id);
  }

  editProduto = produto => {
    return this.props.api.editProduto(produto);
  }

  render() {
    return (
      <Router>
        <div>
          <nav className='navbar navbar-inverse'>
            <div className='container'>
              <div className='navbar-header'>
                <a href="/" className='navbar-brand'>
                  Gerenciador de produtos
                </a>
              </div>
              <ul className='nav navbar-nav'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/produtos">Produtos</Link></li>              
                <li><Link to="/sobre">Sobre</Link></li>              
              </ul>
            </div>
          </nav>
          <div className='container'>
            <Route exact path='/' component={Home} />
            <Route exact path='/sobre' component={Sobre} />
            <Route path='/produtos' render={(props) => {
              return (
                <Produtos 
                  {...props} 
                  categoria={this.state.categoria}
                  readCategoria={this.readCategoria}
                  loadCategorias={this.loadCategorias}
                  removeCategoria={this.removeCategoria}
                  createCategoria={this.createCategoria}
                  editCategoria={this.editCategoria}
                  categorias={this.state.categorias}

                  createProduto={this.createProduto}
                  loadProdutos={this.loadProdutos}
                  produtos={this.state.produtos}
                  removeProduto={this.removeProduto}
                  readProduto={this.readProduto}
                  editProduto={this.editProduto}
                />
              )}}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;