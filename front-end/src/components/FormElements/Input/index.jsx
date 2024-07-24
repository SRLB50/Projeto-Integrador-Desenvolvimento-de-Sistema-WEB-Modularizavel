/* eslint-disable */
import { react, useState } from 'react'
import { Input, FormGroup, Label } from 'reactstrap'
import './index.scss'

const InputElement = ({id, label, value, setValue, name,  ...props}) => {

  return (
    <FormGroup>
      <Label for={id} style={{textAlign: 'left', cursor: 'pointer'}}>{label}</Label>
      <Input  
        id={id}
        name={name}
        value={value} 
        onChange={(e) => {setValue(e.target.value)}} 
        className=''
      />
    </FormGroup>
  )
}

export default InputElement