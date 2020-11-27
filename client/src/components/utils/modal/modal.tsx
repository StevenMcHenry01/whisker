// 3rd party imports
import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'

// My imports
import styles from './Modal.module.scss'

interface ModalProps {
  showModal: any
  setShowModal: any
  top?: number
}

const Backdrop = ({ show, setShowModal }: any) =>
  show ? (
    <div
      role="button"
      tabIndex={0}
      className={styles.backdrop}
      onKeyDown={(e) => {
        if (e.key === 'End') {
          setShowModal(false)
        }
      }}
      onClick={() => setShowModal(false)}
    ></div>
  ) : null

export const Modal: React.FC<ModalProps> = ({
  children,
  showModal,
  setShowModal,
  top = 30,
}) => {
  return (
    <>
      <Backdrop show={showModal} setShowModal={setShowModal} />
      <div
        className={styles.modal}
        style={{
          transform: showModal ? 'translateY(0)' : 'translateY(-3rem)',
          opacity: showModal ? 1 : 0,
          visibility: showModal ? 'visible' : 'hidden',
          top: `${top}%`,
        }}
      >
        <div
          role="button"
          tabIndex={0}
          className={styles.x}
          onKeyDown={(e) => {
            if (e.key === 'End') {
              setShowModal(false)
            }
          }}
          onClick={() => setShowModal(false)}
        >
          <AiOutlineCloseCircle size="1.5rem" color="var(--color-main-pink)" />
        </div>
        {children}
      </div>
    </>
  )
}
