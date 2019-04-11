import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { WithContext as ReactTags } from 'react-tag-input'

import TextInput from './form/textInput'
import SelectInput from './form/selectInput'

const KeyCodes = {
  comma: 188,
  enter: 13
}
const delimiters = [KeyCodes.comma, KeyCodes.enter]

class Editar extends Component {
  state = {
    id: 12345,
    nome: '',
    sobrenome: '',
    idade: '',
    email: '',
    telefone: '',
    estado: '',
    pais: '',
    tags: [],
    endereco: '',
    casa: '',
    trabalho: '',
    novidades: '',
    picture: null
  }

  componentDidMount() {
    const { data } = this.props.location.state
    this.setState({
      nome: data.nome,
      sobrenome: data.sobrenome,
      idade: data.idade,
      email: data.email,
      telefone: data.telefone,
      estado: data.estado,
      pais: data.pais,
      interesses: data.interesses,
      endereco: data.endereco,
      casa: data.casa,
      tags: data.tags,
      trabalho: data.trabalho,
      novidades: data.novidades,
      picture: data.picture
    })
  }

  handleDelete = i => {
    const { tags } = this.state
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    })
  }

  handleAddition = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }))
  }

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags]
    const newTags = tags.slice()

    newTags.splice(currPos, 1)
    newTags.splice(newPos, 0, tag)

    // re-render
    this.setState({ tags: newTags })
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handlePic = e => {
    this.setState({
      picture: URL.createObjectURL(e.target.files[0])
    })
  }

  // VALIDA CAMPO NOME E DEFINE ERRO NO STATE CASO NECESSARIO
  handleName = e => {
    if (e.target.value.match('^[a-zA-Z]{0,20}$')) {
      this.setState({ hasError: false })
    } else {
      this.setState({ hasError: true })
    }
  }

  render() {
    const { hasError, nome } = this.state
    const { tags } = this.state

    // DESABILITA O BOTAO ENVIAR CASO AJA ERRO NO CAMPO NOME.
    let enviarBtn
    if (hasError || !nome) {
      enviarBtn = <span className="saveBtn disabled">Salvar</span>
    } else {
      enviarBtn = (
        <Link className="saveBtn" to={{ pathname: `/perfil/${this.state.id}`, state: { data: this.state } }}>
          Salvar
        </Link>
      )
    }

    return (
      <form noValidate>
        <div>
          <div>
            <input id="file" type="file" onChange={this.handlePic} className="fileField" />
            {this.state.picture ? <img src={this.state.picture} alt="profile pic" /> : null}

            {this.state.picture ? (
              <label htmlFor="file" className="btn">
                Alterar foto
              </label>
            ) : (
              <label htmlFor="file" className="btn">
                Carregue sua foto
              </label>
            )}
          </div>
        </div>
        <div>
          {hasError && <small className="error">Apenas letras e 20 caracteres são permitidos</small>}
          <TextInput
            onKeyUp={this.handleName}
            name="nome"
            label="Nome"
            type="text"
            id="nome"
            value={this.state.nome}
            onChange={this.handleInput}
          />

          <TextInput
            name="sobrenome"
            label="Sobrenome"
            id="sobrenome"
            type="text"
            value={this.state.sobrenome}
            onChange={this.handleInput}
          />

          <div className="form-element">
            <label htmlFor="idade">Idade</label>
            <input
              type="range"
              id="idade"
              name="idade"
              min="0"
              max="100"
              step="33"
              value={this.state.idade}
              onChange={this.handleInput}
            />
          </div>
          <div className="ages">
            <div>13-19</div>
            <div>20-29</div>
            <div>30-45</div>
            <div>45 e acima</div>
          </div>

          <TextInput
            name="email"
            label="Email"
            id="email"
            type="email"
            value={this.state.email}
            onChange={this.handleInput}
          />

          <TextInput
            name="telefone"
            label="Telefone"
            id="telefone"
            type="text"
            value={this.state.telefone}
            onChange={this.handleInput}
          />

          <SelectInput id="estado" label="Estado" name="estado" value={this.state.estado} onChange={this.handleInput}>
            <option value="selecionar">Selecionar</option>
            <option value="PR">Paraná</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RS">Rio Grande do Sul</option>
          </SelectInput>

          <SelectInput id="pais" label="País" name="pais" value={this.state.pais} onChange={this.handleInput}>
            <option value="Selecionar...">Selecionar...</option>
            <option value="brasil">Brasil</option>
            <option value="usa">USA</option>
            <option value="portugal">Portugal</option>
          </SelectInput>

          <SelectInput
            id="endereco"
            label="Endereço"
            name="endereco"
            value={this.state.endereco}
            onChange={this.handleInput}>
            <option value="Selecionar...">Selecionar...</option>
            <option value="casa">Casa</option>
            <option value="trabalho">Trabalho</option>
          </SelectInput>

          {this.state.endereco === 'casa' ? (
            <TextInput
              name="casa"
              label="Endereço Residencial"
              id="casa"
              type="text"
              value={this.state.casa}
              onChange={this.handleInput}
            />
          ) : null}
          {this.state.endereco === 'trabalho' ? (
            <TextInput
              name="trabalho"
              label="Endereço Comercial"
              id="trabalho"
              type="text"
              value={this.state.trabalho}
              onChange={this.handleInput}
            />
          ) : null}

          <small>Utilize "vírgula" ou "enter" para incluir interesses.</small>
          <div className="form-element">
            <label htmlFor="interesses">Interesses</label>
            <ReactTags
              id="interesses"
              tags={tags}
              handleDelete={this.handleDelete}
              handleAddition={this.handleAddition}
              delimiters={delimiters}
              inputFieldPosition="top"
              autofocus={false}
              allowDragDrop={false}
              placeholder="Adicionar interesse..."
            />
          </div>

          {enviarBtn}
        </div>
      </form>
    )
  }
}

export default Editar
