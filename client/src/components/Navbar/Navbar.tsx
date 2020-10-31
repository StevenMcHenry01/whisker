// 3rd party imports
import React from 'react'
import { Box, Heading, Flex, Text, Button } from '@chakra-ui/core'
import styled from 'styled-components'

// STYLING
const DropDownButton = styled(Button)`
  display: none;
  background-color: transparent;
  border: 1px solid white;
  @media only screen and (max-width: 700px) {
    display: block;
  }
`
const MenuItems = ({ children }: any) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display='block'>
    {children}
  </Text>
)

const Menu = ({ show }: { show: boolean }) => {
  const MenuStyled = styled(Box)`
    display: flex;
    width: auto;
    @media only screen and (max-width: 700px) {
      width: 100%;
      display: ${show ? 'block' : 'none'};
    }
  `

  return (
    <MenuStyled alignItems='center' flexGrow={1}>
      <MenuItems>Docs</MenuItems>
      <MenuItems>Examples</MenuItems>
      <MenuItems>Blog</MenuItems>
    </MenuStyled>
  )
}

const LoginButton = styled(Box)`
  @media only screen and (max-width: 700px) {
    display: none;
  }
`

export const Navbar = (props: any) => {
  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      padding='1.5rem'
      bg='teal.500'
      wrap='wrap'
      color='white'
      {...props}
    >
      <Flex align='center' mr={5}>
        <Heading as='h1' size='lg'>
          Site Title
        </Heading>
      </Flex>

      {/* The drop down toggle */}
      <DropDownButton onClick={handleToggle}>
        <svg
          fill='white'
          width='12px'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Menu</title>
          <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
        </svg>
      </DropDownButton>

      <Menu show={show} />

      <LoginButton>
        <Button bg='transparent' border='1px'>
          Login or Register
        </Button>
      </LoginButton>
    </Flex>
  )
}
