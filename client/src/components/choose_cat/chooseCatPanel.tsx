// 3rd party imports
import React from 'react'
import Image from 'next/image'
import { useChooseCatMutation } from '../../generated/graphql'
import { useApolloClient } from '@apollo/client'
import { useRouter } from 'next/router'
import Link from 'next/link'

// My imports
import styles from './ChooseCat.module.scss'
import { Button } from '../utils/buttons/button'

interface ChooseCatPanelProps {
  name: string
  photoUrl: string
  id: number
}

export const ChooseCatPanel: React.FC<ChooseCatPanelProps> = ({
  name,
  photoUrl,
  id,
}) => {
  const [chooseCat] = useChooseCatMutation()

  const apolloClient = useApolloClient()

  const router = useRouter()

  const handleChooseCat = async () => {
    const cat = await chooseCat({ variables: { id } })
    if (cat) {
      apolloClient.resetStore()
      router.push('/')
    }
  }
  return (
    <div className={styles.choose_cat_card}>
      <Image src={photoUrl} alt="cat" layout="fill" />
      <div className={styles.main_content}>
        <p className={styles.name}>{name}</p>
        <div className={styles.button_container}>
          <Button
            onClick={handleChooseCat}
            style={{
              marginRight: '1rem',
              backgroundColor: 'var(--color-main-orange)',
            }}
          >
            Choose Me!
          </Button>
          <Link href="/edit-cat">
            <a>
              <Button>Edit Cat</Button>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}
