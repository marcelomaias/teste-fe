import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <Link className="btn btnCadastro" to="/cadastro">
        Cadastro
      </Link>
    </div>
  )
}

export default Home
