// 3rd party imports
import React from 'react'
import {Box} from '@chakra-ui/core'

// My imports
interface ContentWrapperProps {}


export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  return <Box m='0 auto' maxW='4xl'>{children}</Box>
}
