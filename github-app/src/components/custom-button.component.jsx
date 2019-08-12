import React from 'react'
import styled from 'styled-components'

const CustomButton = ({ children, ...otherProps }) => <Button {...otherProps}>{children}</Button>

const Button = styled.button.attrs({
  className: 'b pv2 ba b--black bg-transparent grow pointer f5 mt3 mw5 br2',
  type: 'submit',
})``

export default CustomButton
