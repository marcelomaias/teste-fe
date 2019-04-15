import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Perfil extends Component {
  state = {
    picture: this.props.location.state.data.picture
  }

  handleSubmit = e => {
    e.preventDefault()
    const novoPerfil = this.props.location.state.data
    axios
      .post('/perfis', novoPerfil)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    console.log(novoPerfil)
  }
  handlePic = e => {
    this.setState({
      picture: URL.createObjectURL(e.target.files[0])
    })
  }
  render() {
    const { data } = this.props.location.state
    const { nome, sobrenome, email, id, estado, tags, telefone, idade } = data
    // console.log(data)

    const idadeFiltrada = () => {
      if (idade > 98) {
        return (
          <span>
            e eu tenho <strong>mais de 45 anos</strong>
          </span>
        )
      } else if (idade > 65) {
        return (
          <span>
            e eu tenho <strong>mais de 30 anos</strong>
          </span>
        )
      } else if (idade > 32) {
        return (
          <span>
            e eu tenho <strong>mais de 20 anos</strong>
          </span>
        )
      } else {
        return (
          <span>
            e eu tenho <strong>mais de 13 anos</strong>
          </span>
        )
      }
    }

    const interesses = tags.map(tag => <span key={tag.id}>{tag.text}, </span>)

    return (
      <div className="perfil">
        <div className="fotoArea">
          <input id="file" type="file" onChange={this.handlePic} className="fileField" />
          {this.state.picture && <img src={this.state.picture} alt="profile pic" />}

          {this.state.picture ? (
            <label htmlFor="file" className="btn">
              Alterar foto
            </label>
          ) : (
            <label htmlFor="file" className="btn">
              Carregue sua foto
            </label>
          )}
          <Link to={{ pathname: `/editar/${id}`, state: { data: data } }}>Editar Perfil</Link>
        </div>
        <div>
          <p>
            Eu sou{' '}
            <strong>
              {nome} {sobrenome}
            </strong>
            , {idadeFiltrada()}.{email && `Você pode me mandar emails para ${email}.`}{' '}
            {estado && `Eu moro no estado do ${estado}.`} Eu gosto de {interesses} entre outros. Por favor, me envie
            newsletters. {telefone && `Para me contatar ligue no telefone ${telefone}.`}
          </p>

          <form onSubmit={this.handleSubmit} noValidate>
            <button>Confirmar</button>
          </form>
        </div>
      </div>
    )
  }
}

export default Perfil
