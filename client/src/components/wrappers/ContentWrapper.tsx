// 3rd party imports
import React from 'react'
import { Box } from '@chakra-ui/core'

// My imports
interface ContentWrapperProps {
  children: any
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({
  children,
}: ContentWrapperProps) => {
  return (
    <Box m='0 auto' maxW='4xl'>
      {children}
    </Box>
  )
}
