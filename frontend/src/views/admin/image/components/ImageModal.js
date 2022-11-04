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
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import ImageInfoModal from "views/admin/image/components/ImageInfoModal";
import ImageDockerFileModal from "views/admin/image/components/ImageDockerFileModal";
import ImageLayerModal from "views/admin/image/components/ImageLayerModal";
import ImageExportInfoModal from "views/admin/image/components/ImageExportInfoModal"; // Export all
import ImageExportImageModal from "views/admin/image/components/ImageExportImageModal"; // Export Image's image



export default function ImageModal(props) {
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
            Image ID: {id.slice(7, 12)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">What would you like to do?</Text>
            <ImageInfoModal id={id} />
            <Button margin="5px" bg="purple.300" _hover={{ bg: "purple.400" }}>View File Structure</Button>
            <Button margin="5px" bg="cyan.500" _hover={{ bg: "cyan.600" }}>View File Difference</Button>
            <br />
            <ImageLayerModal id={id} />
            <ImageDockerFileModal id={id} />
            <ImageExportInfoModal id={id} />
            <ImageExportImageModal id={id} />
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
