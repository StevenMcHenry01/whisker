// 3rd party imports
import React, { useState } from 'react'
import { Box, Heading, Flex, Button, Text, useDisclosure } from '@chakra-ui/core'
import styled from 'styled-components'
import { DesktopLinks } from './DesktopLinks'
import { Burger } from './Burger'
import { useLogoutMutation, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { ModalCustom } from '../utils/ModalCustom'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useApolloClient } from '@apollo/client'

// STYLING
const LoginButton = styled(Box)`
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const Navbar = (): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const links = [
    {
      displayName: 'home',
      link: '/',
    },
    {
      displayName: 'page2',
      link: '/page2',
    },
    {
      displayName: 'page3',
      link: '/page3',
    },
  ]

  const { data, loading } = useMeQuery({
    skip: isServer(),
  })

  const apolloClient = useApolloClient()

  const router = useRouter()

  const [logout, { loading: logoutLoading }] = useLogoutMutation()

  const handleLogout = () => {
    logout()
    onClose()
    apolloClient.resetStore()
    router.push('/')
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center">
        <Link href="/">
          <Heading as="h1" size="lg" mr="5">
            Site Title
          </Heading>
        </Link>
        <DesktopLinks links={links} />
      </Flex>

      <Burger links={links} />

      <ModalCustom
        modalBody="Are you sure?"
        danger
        secondaryButtonText="logout"
        isOpen={isOpen}
        onClose={onClose}
        buttonFunction={handleLogout}
      />

      {data?.me ? (
        <Flex align="center">
          <Flex mr="5">
            <Text mr="3">👋</Text>
            <Text>{data.me.username}</Text>
          </Flex>
          <Button isLoading={logoutLoading} onClick={onOpen} variant="outline">
            Logout
          </Button>
        </Flex>
      ) : (
        <LoginButton>
          <Button bg="transparent" border="1px">
            <Link href="/login-register">Login or Register</Link>
          </Button>
        </LoginButton>
      )}
    </Flex>
  )
}
