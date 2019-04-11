import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// COMPONENTS
import './App.css'
import Home from './components/home'
import Cadastro from './components/cadastro'
import Perfil from './components/perfil'
import Editar from './components/editar'

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/cadastro" component={Cadastro} exact />
        <Route path="/perfil/:id" component={Perfil} exact />
        <Route path="/editar/:id" component={Editar} exact />
      </Router>
    )
  }
}

export default App
