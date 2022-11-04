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

export default function ContainerInfoModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [logs, setLogs] = useState();

  useEffect(async () => {
    if (!id) return;

    let containerLogs = (await axios.get(`http://${API}/api/container/logs/${id}`)).data.response;

    if (containerLogs === "") containerLogs = "NO LOGS FOUND"
    setLogs(containerLogs);
  }, []);

  return (
    <>
    <Button onClick={onOpen} margin="5px" bg="orange.300" _hover={{ bg: "orange.400" }}>View Logs</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Container ID: {id.slice(0,12)}</Text>
            <Text fontSize="lg">Logs</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Code
                bg="gray.200"
                display="block"
                whiteSpace="pre"
                children={logs}
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
