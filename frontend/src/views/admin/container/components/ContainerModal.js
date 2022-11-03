import React from "react";

import { InfoIcon } from '@chakra-ui/icons'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";

import ContainerInfoModal from "views/admin/container/components/ContainerInfoModal";
import ContainerExportInfoModal from "views/admin/container/components/ContainerExportInfoModal";
import ContainerExportImageModal from "views/admin/container/components/ContainerExportImageModal";


export default function ContainerModal(props) {
  const { id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>
        <InfoIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="2xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">
            Container ID:
            <br />
            {id}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ContainerInfoModal id={id} />
            <Button margin="5px" bg="purple.300" _hover={{ bg: "purple.400" }}>View File Structure</Button>
            <Button margin="5px" bg="cyan.500" _hover={{ bg: "cyan.600" }}>View File Difference</Button>
            <br />
            <ContainerExportInfoModal id={id} />
            <ContainerExportImageModal id={id} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
