import React from "react";

import { InfoIcon } from '@chakra-ui/icons'

import { TreeView } from '@mui/lab';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import ContainerInfoModal from "views/admin/container/components/ContainerInfoModal";
import ContainerLogsModal from "views/admin/container/components/ContainerLogsModal";
import ContainerExportInfoModal from "views/admin/container/components/ContainerExportInfoModal";
import ContainerExportImageModal from "views/admin/container/components/ContainerExportImageModal";
import ContainerFileStructureModal from "views/admin/container/components/ContainerFileStructureModal"


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
            Container ID: {id.slice(0,12)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">What would you like to do?</Text>
            <ContainerInfoModal id={id} />
            <ContainerLogsModal id={id} />
            <ContainerFileStructureModal id={id} />
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
