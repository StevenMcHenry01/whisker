// 3rd party imports
import Link from 'next/link'
import React from 'react'
import { MeQuery } from '../../../generated/graphql'
import { Button } from '../../utils/buttons/button'

import { FaCat } from 'react-icons/fa'

// My imports
import styles from './CatSelect.module.scss'

interface CatSelectedProps {
  data: MeQuery
}

export const CatSelected: React.FC<CatSelectedProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      {data?.me?.selectedCat ? (
        <>
          <div className={styles.cat_pill}>
            {data.me.selectedCat.name}
            <FaCat />
          </div>
          <div style={{ marginTop: '.5rem' }}>
            <Link href="/select-cat">
              <a>
                <Button
                  style={{
                    padding: '4px',
                    backgroundColor: '#f0ab83',
                    color: 'var(--color-white)',
                    fontSize: '.8rem',
                  }}
                >
                  Select Other
                </Button>
              </a>
            </Link>
          </div>
        </>
      ) : (
        <>
          <span>No cat selected</span>
          <div style={{ marginTop: '.5rem' }}>
            <Link href="/select-cat">
              <a>
                <Button
                  style={{
                    padding: '4px',
                    backgroundColor: '#f0ab83',
                    color: 'var(--color-white)',
                    fontSize: '.8rem',
                  }}
                >
                  Select One
                </Button>
              </a>
            </Link>
          </div>
        </>
      )}
    </div>
  )
}
