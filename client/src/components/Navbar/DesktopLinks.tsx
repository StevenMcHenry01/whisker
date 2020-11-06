// 3rd party imports
import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

// My imports

interface DesktopLinksProps {
  links: {
    displayName: string
    link: string
  }[]
}

const DesktopLinksWrapper = styled.div`
  display: flex;
  div {
    margin-right: 10px;
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }
`

export const DesktopLinks: React.FC<DesktopLinksProps> = ({ links }: DesktopLinksProps): any => {
  return (
    <DesktopLinksWrapper>
      {links.map((link) => {
        return (
          <div key={link.link}>
            <Link href={link.link}>{link.displayName}</Link>
          </div>
        )
      })}
    </DesktopLinksWrapper>
  )
}
