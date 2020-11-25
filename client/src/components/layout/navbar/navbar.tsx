// 3rd party imports
import React, { useState } from 'react'
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql'
import { isServer } from '../../../utils/isServer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { useApolloClient } from '@apollo/client'
import { Button } from '../../utils/buttons/button'
import styles from './Navbar.module.scss'
import { CatSelected } from './catSelected'
import { Modal } from '../../utils/modal/modal'

export const Navbar = (): JSX.Element => {
  const { data } = useMeQuery({
    skip: isServer(),
  })

  const apolloClient = useApolloClient()

  const router = useRouter()

  const [logout] = useLogoutMutation()
  const [showModal, setShowModal] = useState(false)

  const handleLogout = async () => {
    setShowModal(false)
    const response = await logout()
    if (response.data?.logout) {
      apolloClient.resetStore()
      router.push('/')
    }
  }

  return (
    <nav className={styles.nav}>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p>Are you sure you want to Logout?</p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </Modal>
      {data?.me?.selectedCat && (
        <Link href={`/matches/${data.me.selectedCat.id}`}>
          <a>
            <Button>View Matches</Button>
          </a>
        </Link>
      )}
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CatSelected data={data} />
            <Button onClick={() => setShowModal(true)}>Logout</Button>
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
