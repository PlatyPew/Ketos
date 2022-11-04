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

const API = "127.0.0.1:3000"

export default function ImageInfoModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [info, setInfo] = useState();

  useEffect(async () => {
    if (!id) return;
    
    const imageDockerFile = (await axios.get(`http://${API}/api/image/dockerfile/${id.slice(7)}`)).data.response;
    setInfo(imageDockerFile);
  }, []);

  return (
    <>
    <Button onClick={onOpen} margin="5px" bg="teal.300" _hover={{ bg: "teal.400" }}>View DockerFile</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">
            Image ID: {id.slice(7, 12)}
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
