import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Sobre from './Sobre';
import Produtos from './Produtos'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categorias: []
    }
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
                  loadCategorias={this.loadCategorias}
                  removeCategoria={this.removeCategoria}
                  createCategoria={this.createCategoria}
                  categorias={this.state.categorias}
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