import React from 'react'
import styled from 'styled-components'

const FormInput = ({ label, ...otherProps }) => (
  <>
    <Label>{label}</Label>
    <Input {...otherProps} />
  </>
)

const Label = styled.label.attrs({
  className: `db fw4 lh-copy f4`,
})``

const Input = styled.input.attrs({
  className: `b pa2 input-reset ba bg-transparent`,
})``

export default FormInput
