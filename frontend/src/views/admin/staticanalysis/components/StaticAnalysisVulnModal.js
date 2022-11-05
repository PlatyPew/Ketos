import React from "react";

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
  Center,
  ButtonGroup,
  useDisclosure,
} from "@chakra-ui/react";
import { InfoIcon } from '@chakra-ui/icons'

import StaticAnalysisVulnInfoModal from "views/admin/staticanalysis/components/StaticAnalysisVulnInfoModal";

export default function StaticAnalysisVulnModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
    <Button onClick={onOpen}><InfoIcon /></Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Image ID: {id.slice(0,12)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">What would you like to do?</Text>
            <br></br>
            <Center>
              <ButtonGroup variant="outline" spacing="3">
                <StaticAnalysisVulnInfoModal id={id}/>
              </ButtonGroup>
            </Center>
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
