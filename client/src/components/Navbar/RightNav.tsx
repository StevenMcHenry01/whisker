import { useTheme } from '@chakra-ui/core'
import styled from 'styled-components'
import theme from '../../styles/theme'
import Link from 'next/link'

interface RightNavProps {
  show: boolean
  setShow: (set: boolean) => any
  links: {
    displayName: string
    link: string
  }[]
}

const LinksWrapper = styled.div<{ show: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.gray[700]};
    position: fixed;
    transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 100vh;
    width: 300px;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
    li {
      color: #fff;
    }
  }
`
const BackgroundBlur = styled.div<{ show: boolean }>`
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? 1 : 0)};
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #6161618a;
  backdrop-filter: blur(3px);
  transition: visibility 0s, opacity 0.3s ease-in-out;
`

const LinkStyled = styled(Link)`
  font-size: 30px;
  margin-bottom: 20px;
`

const RightNav: React.FC<RightNavProps> = ({
  show,
  links,
  setShow,
}: RightNavProps): JSX.Element => {
  const theme = useTheme()
  return (
    <>
      <BackgroundBlur show={show} onClick={() => setShow(false)} />
      <LinksWrapper theme={theme} show={show}>
        {links.map((link) => (
          <LinkStyled href={link.link} key={link.link}>
            <a onClick={() => setShow(false)}>{link.displayName}</a>
          </LinkStyled>
        ))}
      </LinksWrapper>
    </>
  )
}

export default RightNav
