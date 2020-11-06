// 3rd party imports
import React from 'react'
import styled from 'styled-components'
import theme from '../../styles/theme'
import RightNav from './RightNav'

// My imports

interface BurgerProps {
  links: {
    displayName: string
    link: string
  }[]
}

const StyledBurger = styled.div<{ show: boolean }>`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  right: 20px;
  z-index: 20;
  display: none;
  :hover {
    cursor: pointer;
    top: 14px;
  }
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ show }) => (show ? '#ccc' : theme.colors.gray[700])};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ show }) => (show ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      opacity: ${({ show }) => (show ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ show }) => (show ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

export const Burger: React.FC<BurgerProps> = ({ links }: BurgerProps) => {
  const [show, setShow] = React.useState(false)
  return (
    <>
      <StyledBurger show={show} onClick={() => setShow(!show)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav links={links} show={show} setShow={setShow} />
    </>
  )
}
