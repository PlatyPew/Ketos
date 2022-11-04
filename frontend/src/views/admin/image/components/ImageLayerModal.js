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

export default function ImageLayerModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [info, setInfo] = useState();

  useEffect(async () => {
    if (!id) return;
    
    const imageLayer = (await axios.get(`http://${API}/api/image/layer/${id.slice(7)}`)).data.response;
    setInfo(JSON.stringify(imageLayer, null, 2));
  }, []);

  return (
    <>
    <Button onClick={onOpen} margin="5px" bg="yellow.300" _hover={{ bg: "yellow.400" }}>View Layers</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">
            Image ID: {id.slice(7, 12)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">Information</Text>
            <Box>
              <Code
                bg="gray.200"
                display="block"
                whiteSpace="pre"
                children={info}
                style={{ whiteSpace: "pre-wrap" }}
              />
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
