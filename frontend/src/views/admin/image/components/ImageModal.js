import React from "react";

import { InfoIcon } from '@chakra-ui/icons'

import {
  Box,
  ButtonGroup,
  Center,
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
import ImageExportFileModal from "views/admin/image/components/ImageExportFileModal"; // Export Image's image



export default function ImageModal(props) {
  const { id } = props;
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>
        <InfoIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">
            Image ID: {id.slice(7, 19)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">What would you like to do?</Text>
            <br></br>
            <Box alignItems="center">
              <Center>
                <ButtonGroup variant="outline" spacing="3">
                  <ImageInfoModal id={id} />
                  <ImageLayerModal id={id} />
                  <ImageDockerFileModal id={id} />
                </ButtonGroup>
              </Center>
              <Center>
                <ButtonGroup variant="outline" spacing="3">
                  <ImageExportInfoModal id={id} />
                  <ImageExportImageModal id={id} />
                  <ImageExportFileModal id={id} />
                </ButtonGroup>
              </Center>
            </Box>
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
