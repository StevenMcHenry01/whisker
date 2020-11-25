// 3rd party imports
import React from 'react'
import { PulseLoader } from 'react-spinners'

// My imports
import { useDelayedRender } from '../../../hooks/useDelayedRender'

const DelayedRender = ({ delay, children }: any) =>
  useDelayedRender(delay)(() => children)

interface LoadingProps {
  size?: number
  delay?: number
}

const Loading: React.FC<LoadingProps> = ({
  size = 25,
  delay = 500,
}: LoadingProps) => {
  return (
    // delay the loading spinner by 500 milliseconds
    <DelayedRender delay={delay}>
      <div style={{ margin: '0 auto' }}>
        <PulseLoader size={size} color={'#fcadff'} />
      </div>
    </DelayedRender>
  )
}

export default Loading
