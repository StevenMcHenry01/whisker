// 3rd party imports
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql'
import { isServer } from '../../../utils/isServer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useApolloClient } from '@apollo/client'
import { Button } from '../../utils/buttons/button'
import styles from './Navbar.module.scss'

export const Navbar = (): JSX.Element => {
  const { data, loading } = useMeQuery({
    skip: isServer(),
  })

  const apolloClient = useApolloClient()

  const router = useRouter()

  const [logout, { loading: logoutLoading }] = useLogoutMutation()

  const handleLogout = async () => {
    const response = await logout()
    if (response.data?.logout) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <nav className={styles.nav}>
      {data?.me?.selectedCat && <Link href={`/matches/${data.me.selectedCat.id}`}>
        <a>
          <Button>View Matches</Button>
        </a>
      </Link>
      }
      <div className={styles['nav__centered-elements']}>
        <Link href="/">
          <a className="filter-shadow">
            <Image
              src="/images/logo.png"
              alt="whisker logo"
              width={150}
              height={65}
            />
          </a>
        </Link>
      </div>
      <div className={styles['nav__right-elements']}>
        {data?.me ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ margin: '0 1rem' }}>
              👋 {data.me.user && data.me.user.username}
            </div>
            <div style={{ marginRight: '1rem' }}>
              Cat: {data.me.selectedCat ? (
                <>
                  <span>{data.me.selectedCat.name}</span>
                  <div>
                    <Link href="/select-cat">
                      <a>
                        <button>Select Other</button>
                      </a>
                    </Link>
                  </div>
                </>
              ) : (
                  <>
                    <span>None</span>
                    <div>
                      <Link href="/select-cat">
                        <a>
                          <button>Select One</button>
                        </a>
                      </Link>
                    </div>
                  </>
                )}
            </div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        ) : (
            <Link href="/login">
              <a>
                <Button>Login</Button>
              </a>
            </Link>
          )}
      </div>
    </nav>
  )
}
