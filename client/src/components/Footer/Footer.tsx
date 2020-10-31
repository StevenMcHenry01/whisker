// 3rd party imports
import { Text } from '@chakra-ui/core'
import React from 'react'
import styled from 'styled-components'

// My imports

interface FooterProps {}

// STYLING
const FooterStyled = styled.footer`
  border-top: 1px solid lightgray;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
`

export const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <FooterStyled>
      <Text>Footer</Text>
    </FooterStyled>
  )
}
