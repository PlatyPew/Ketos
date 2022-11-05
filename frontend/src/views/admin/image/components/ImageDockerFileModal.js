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
    <Button onClick={onOpen} margin="5px" bg="orange.300" _hover={{ bg: "orange.400" }}>View DockerFile</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">
            Image ID: {id.slice(7, 19)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">Dockerfile</Text>
            <Box bg='gray.200'>
            <Box>
              <Code
                bg="gray.200"
                display="block"
                whiteSpace="pre"
                children={info}
                style={{ whiteSpace: "pre-wrap" }}
              />
            </Box>
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
