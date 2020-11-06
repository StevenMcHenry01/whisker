import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/core'
import theme from '../../styles/theme'

interface ModalCustomProps {
  modalBody?: JSX.Element | string
  isOpen: boolean
  onClose(): void
  secondaryButtonText: string
  title?: string
  danger?: boolean
  buttonFunction(): any
}

export const ModalCustom = ({
  modalBody,
  isOpen,
  onClose,
  secondaryButtonText,
  title,
  danger,
  buttonFunction,
}: ModalCustomProps): JSX.Element => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalBody}</ModalBody>
          <ModalFooter>
            <Button
              color="white"
              backgroundColor={danger ? theme.colors.danger : theme.colors.primary}
              onClick={buttonFunction}
            >
              {secondaryButtonText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
