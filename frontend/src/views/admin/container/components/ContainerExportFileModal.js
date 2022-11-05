import React, { useState } from "react";

import {
  Stack,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Button,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";
import { saveAs } from 'file-saver'

const API = "127.0.0.1:3000"

export default function ContainerExportFileModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [file, setFile] = useState("");
  const [load, setLoad] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setFile(value);
  };

  const handleDownload = async () => {
    if (!id) return;

    setLoad(true);
    const out = await axios.get(`http://${API}/api/container/fs/${id}/single`, {
      params: { file: file },
      responseType: 'blob'
    });

    setLoad(false);
    saveAs(out.data, file);
  };

  return (
    <>
      <Button onClick={onOpen} margin="5px" bg="yellow.200" _hover={{ bg: "yellow.300" }}>Export File</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Container ID: {id.slice(0, 12)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} >
              <Text fontSize="lg">File To Export</Text>
              <InputGroup>
                <InputLeftAddon children='File' />
                <Input placeholder='etc/passwd' onChange={handleChange} value={file} />
              </InputGroup>
              <Box>
                <Button
                  isLoading={load}
                  loadingText="Retrieving File"
                  onClick={handleDownload}
                  marginTop="10px"
                  bg="teal.300"
                  _hover={{ bg: "teal.400" }} >
                  Export File
                </Button>
              </Box>
            </Stack>
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
