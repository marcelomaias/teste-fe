import React from 'react'

const InputText = props => {
  return (
    <div className="form-element">
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        onKeyUp={props.onKeyUp}
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default InputText
