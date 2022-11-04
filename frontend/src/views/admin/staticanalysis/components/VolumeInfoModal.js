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
  Box,
  Code,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import { InfoIcon } from '@chakra-ui/icons'

const API = "127.0.0.1:3000"

export default function VolumeInfoModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [info, setInfo] = useState();

  useEffect(async () => {
    if (!id) return;
    
    const volumeInfo = (await axios.get(`http://${API}/api/volume/info/${id}`)).data.response;
    setInfo(JSON.stringify(volumeInfo, null, 2));
  }, []);

  return (
    <>
    <Button onClick={onOpen}>
        <InfoIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">
            Volume Name: {id.slice(0, 12)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">Information</Text>
            <Box bg='gray.200'>
              <Code fontSize='sm' bg='gray.200'>
                <pre>{info}</pre>
              </Code>
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
