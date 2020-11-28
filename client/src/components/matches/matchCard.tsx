// 3rd party imports
import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'

// My imports
import { useGetCatQuery } from '../../generated/graphql'
import { Button } from '../utils/buttons/button'
import styles from '../choose_cat/ChooseCat.module.scss'
import { Modal } from '../utils/modal/modal'
import { CatProfile } from '../cat_profile/catProfile'
import { Pic } from '../../generated/graphql'

interface MatchCardProps {
  matchId: number
  chatSessionId: number
}

export const MatchCard: React.FC<MatchCardProps> = ({
  matchId,
  chatSessionId,
}) => {
  const { data, loading, error } = useGetCatQuery({
    variables: { id: matchId },
  })
  const [showModal, setShowModal] = useState(false)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>

  let picUrl
  let pics: Pic[] = []
  if (data?.getCat?.cat?.pics.length !== 0) {
    picUrl = data?.getCat?.cat?.pics[0].url as string
    pics = data?.getCat?.cat?.pics as Pic[]
  } else {
    picUrl = '/images/cat.jpeg'
    pics = [
      {
        url: '/images/cat.jpeg',
        id: 0,
        createdAt: 'date',
        updatedAt: 'date',
      },
    ]
  }

  if (data?.getCat?.cat) {
    return (
      <>
        <Modal showModal={showModal} top={10} setShowModal={setShowModal}>
          <CatProfile
            name={data.getCat.cat.name}
            age={data.getCat.cat.age}
            breed={data.getCat.cat.breed}
            sex={data.getCat.cat.sex}
            bio={data.getCat.cat.bio}
            ownerName={data.getCat.cat.owner.username}
            pics={pics}
          />
        </Modal>
        <div className={styles.choose_cat_card}>
          <Image src={picUrl} alt="cat" layout="fill" />
          <div className={styles.main_content}>
            <p className={styles.name}>{data?.getCat?.cat?.name}</p>
            <div className={styles.button_container}>
              <Link
                href={`/chat-session/${chatSessionId}?receiever=${data?.getCat?.cat?.name}&receiverId=${data?.getCat?.cat?.id}`}
              >
                <a style={{ marginRight: '1rem' }}>
                  <Button colorVariant="salmon">Message</Button>
                </a>
              </Link>

              <Button onClick={() => setShowModal(true)}>View Profile</Button>
            </div>
          </div>
        </div>
      </>
    )
  }
  return null
}
