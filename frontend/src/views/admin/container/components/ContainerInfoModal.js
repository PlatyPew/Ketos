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
  Box,
  Code,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";

const API = "127.0.0.1:3000"

export default function ContainerInfoModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [info, setInfo] = useState();

  useEffect(async () => {
    if (!id) return;

    const containerInfo = (await axios.get(`http://${API}/api/container/info/${id}`)).data.response;

    setInfo(JSON.stringify(containerInfo, null, 2));
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
            Container ID:
            <br />
            {id}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box bg='gray.200'>
              <Code fontSize='sm' bg='gray.200'>
                <pre>{info}</pre>
              </Code>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme='blue'>Export Data</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
