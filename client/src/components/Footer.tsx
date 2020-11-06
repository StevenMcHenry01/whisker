// 3rd party imports
import { Text } from '@chakra-ui/core'
import React from 'react'
import styled from 'styled-components'

// My imports

interface FooterProps {}

// STYLING
const FooterStyled = styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <FooterStyled>
      <Text>Footer Copyright {new Date().getFullYear()}</Text>
    </FooterStyled>
  )
}
