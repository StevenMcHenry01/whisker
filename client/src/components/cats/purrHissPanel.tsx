// 3rd party imports
import React, { useState } from 'react'
import { IconButton } from '../utils/buttons/iconButton'
import { AiFillLike } from 'react-icons/ai'
import { AiFillDislike } from 'react-icons/ai'
import { useSpring, animated } from 'react-spring'

// My imports
import {
  MeQuery,
  useDislikeCatMutation,
  useLikeCatMutation,
} from '../../generated/graphql'
import styles from './Cats.module.scss'
import { Modal } from '../utils/modal/modal'
import { Button } from '../utils/buttons/button'
import Link from 'next/link'

interface PurrHissPanelProps {
  setPosition: React.Dispatch<React.SetStateAction<number>>
  position: number
  me: MeQuery
  catId: number
}

export const PurrHissPanel: React.FC<PurrHissPanelProps> = ({
  setPosition,
  position,
  me,
  catId,
}) => {
  const [likeCat] = useLikeCatMutation()
  const [dislikeCat] = useDislikeCatMutation()
  const [showModal, setShowModal] = useState(false)
  const [userModal, setUserModal] = useState(false)
  const [matchName, setMatchName] = useState('')
  const [props, set] = useSpring(() => ({ opacity: 0 }))

  const handleClick = async (choice: string) => {
    if (!me.me) {
      setUserModal(true)
      setShowModal(true)
      return
    }
    if (!me.me.selectedCat) {
      setUserModal(false)
      setShowModal(true)
      return
    }

    let response
    if (choice === 'like') {
      response = await likeCat({ variables: { id: catId } })
      if (response?.data?.likeCat.match) {
        setMatchName(response.data.likeCat.match.name)
        set({ opacity: 1 })
        setTimeout(() => {
          set({ opacity: 0 })
        }, 500)
      }
    } else {
      response = await dislikeCat({ variables: { id: catId } })
    }

    setPosition(position + 1)
  }
  return (
    <>
      {userModal ? (
        <Modal small showModal={showModal} setShowModal={setShowModal}>
          <div className="flex center">
            <p>Please Login first.</p>
            <div style={{ margin: '0 auto' }}>
              <Link href="/login">
                <a>
                  <Button onClick={() => setShowModal(false)}>Login</Button>
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal small showModal={showModal} setShowModal={setShowModal}>
          <div className="flex center">
            <p>Please selecte a cat first.</p>
            <div style={{ margin: '0 auto' }}>
              <Link href="/select-cat">
                <a>
                  <Button onClick={() => setShowModal(false)}>
                    Select Cat
                  </Button>
                </a>
              </Link>
            </div>
          </div>
        </Modal>
      )}
      <animated.div className={styles.matchContainer} style={props}>
        <p>Congratulations! you matched with {matchName}!</p>
      </animated.div>
      <div className={styles.purr_hiss}>
        <IconButton
          color="var(--color-error)"
          icon={<AiFillDislike />}
          onClick={() => handleClick('dislike')}
        />
        <IconButton
          color="var(--color-main-purple)"
          icon={<AiFillLike />}
          onClick={() => handleClick('like')}
        />
      </div>
    </>
  )
}
