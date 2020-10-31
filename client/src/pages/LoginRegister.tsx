// 3rd party imports
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/core'
import React, { useState } from 'react'
import { LoginForm } from '../components/LoginRegister/LoginForm/LoginForm'
import { RegisterForm } from '../components/LoginRegister/RegisterForm/RegisterForm'

// My imports

interface LoginRegisterProps {
  startTab?: 'login' | 'register'
}

const LoginRegister: React.FC<LoginRegisterProps> = ({
  startTab = 'login',
}: LoginRegisterProps) => {
  const [tab, setTab] = useState(startTab)

  const currentIndex = tab === 'login' ? 0 : 1 // needed for programatic switch
  const defaultIndex = startTab === 'login' ? 0 : 1
  return (
    <Box
      m='100px auto'
      maxW='md'
      borderWidth='1px'
      rounded='lg'
      overflow='hidden'
    >
      <Tabs
        index={currentIndex}
        defaultIndex={defaultIndex}
        isFitted
        variant='enclosed'
      >
        <TabList mb='1em'>
          <Tab onClick={() => setTab('login')}>Login</Tab>
          <Tab onClick={() => setTab('register')}>Register</Tab>
        </TabList>
        <TabPanels>
          <TabPanel p='20px'>
            <LoginForm />
          </TabPanel>
          <TabPanel p='20px'>
            <RegisterForm />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default LoginRegister
