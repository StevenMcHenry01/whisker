// 3rd party imports
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../../generated/graphql'
import { isServer } from '../../utils/isServer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useApolloClient } from '@apollo/client'

export const Navbar = (): JSX.Element => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  })

  const apolloClient = useApolloClient()

  const router = useRouter()

  const [logout, { loading: logoutLoading }] = useLogoutMutation()

  return (
    <nav className="nav">
      <div className="centered-elements">
        <Link href="/">
          <a>
            <Image
              className="filter-shadow"
              src="/images/logo.png"
              alt="whisker logo"
              width={150}
              height={65}
            />
          </a>
        </Link>
      </div>
      <div className="right-elements">
        {data?.me ? (
          <div>
            👋 {data.me.user.username}
            <button className="main-button">Logout</button>
          </div>
        ) : (
          <Link href="/login-register">
            <a>
              <button className="main-button">
                <span>Login</span>
              </button>
            </a>
          </Link>
        )}
      </div>
    </nav>
  )
}
