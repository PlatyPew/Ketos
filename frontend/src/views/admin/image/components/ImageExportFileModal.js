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

export default function ImageExportFileModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [layer, setLayer] = useState();
  const [file, setFile] = useState("");
  const [load, setLoad] = useState(false);

  const handleChangeLayer = (event) => {
    const value = event.target.value;
    setLayer(value);
  };
  const handleChangeFile = (event) => {
    const value = event.target.value;
    setFile(value);
  };

  const handleDownload = async () => {
    if (!id || !layer || !file) return;

    setLoad(true);
    const layers = Object.keys((await axios.get(`http://${API}/api/image/layer/${id.slice(7)}`)).data.response);
    const layerid = layers[Number(layer) - 1]

    if (!layerid) {
      setLoad(false);
      return;
    }

    try {
      const out = await axios.get(`http://${API}/api/image/fs/${id.slice(7)}/${layerid}`, {
        params: { file: file },
        responseType: 'blob'
      });

      saveAs(out.data, file);
    } catch {

    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      <Button onClick={onOpen} margin="5px" bg="yellow.200" _hover={{ bg: "yellow.300" }}>Export File</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Image ID: {id.slice(7, 19)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} >
              <Text fontSize="lg">File To Export</Text>
              <InputGroup>
                <InputLeftAddon children='Layer' />
                <Input placeholder='1' onChange={handleChangeLayer} value={layer} />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children='File' />
                <Input placeholder='etc/passwd' onChange={handleChangeFile} value={file} />
              </InputGroup>
              <Box>
                <Button
                  isLoading={load}
                  loadingText="Retrieving File"
                  onClick={handleDownload}
                  marginTop="10px"
                  bg="teal.300"
                  _hover={{ bg: "teal.400" }}
                >
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
