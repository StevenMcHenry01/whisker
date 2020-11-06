// 3rd party imports
import { Spinner } from '@chakra-ui/core'
import React from 'react'

// My imports
import { useDelayedRender } from '../../hooks/useDelayedRender'

const DelayedRender = ({ delay, children }: any) =>
  useDelayedRender(delay)(() => children)

interface LoadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  delay?: number
}

const Loading: React.FC<LoadingProps> = ({
  size = 'xl',
  delay = 500,
}: LoadingProps) => {
  return (
    // delay the loading spinner by 500 milliseconds
    <DelayedRender delay={delay}>
      <Spinner size={size} />
    </DelayedRender>
  )
}

export default Loading
