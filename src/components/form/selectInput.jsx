import React from 'react'

const SelectInput = props => {
  return (
    <div className="form-element">
      <label htmlFor={props.id}>{props.label}</label>
      <select name={props.name} value={props.value} onChange={props.onChange}>
        {props.children}
      </select>
    </div>
  )
}

export default SelectInput
