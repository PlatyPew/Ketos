import React, { useState } from "react";

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
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Grid,
  Code,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";

const API = "127.0.0.1:3000"

export default function StaticAnalysisFiledata(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [containerID, setContainerID] = useState("");
  const [file, setFile] = useState("");
  const [load, setLoad] = useState(false);

  const [filedata, setFiledata] = useState({hashsum: "", type: "", strings: ""});
  const [metadata, setMetadata] = useState({date: "", gid: 0, mode: "", size: 0, uid: 0});

  const handleChangeID = (event) => {
    const value = event.target.value;
    setContainerID(value);
  };
  const handleChangeFile = (event) => {
    const value = event.target.value;
    setFile(value);
  };

  const handleDownload = async () => {
    if (!containerID || !file) return;

    setLoad(true);

    try {
      const metadata = (await axios.get(`http://${API}/api/static/metadata/${containerID}`, {
        params: { file: file },
      })).data.response;
      setMetadata(metadata);

      const filedata = (await axios.get(`http://${API}/api/static/filedata/${containerID}`, {
        params: { file: file },
      })).data.response;
      setFiledata(filedata);

      onOpen();
    } finally {
      setLoad(false);
    }
  }

  return (
    <>
      <Box bg="white" borderRadius='lg' overflow='hidden'>
        <Box margin="20px">
          <Text
            fontSize='xl'
            fontWeight='700'
            lineHeight='100%'
          >
            Container Analysis
          </Text>
        </Box>

        <Box margin="20px">
          <InputGroup marginBottom={2}>
            <InputLeftAddon children='ID' />
            <Input
              placeholder='0b5a4d09aba0053c03977723919729ea3148cf23c8d03eca9aae21607c6e2769'
              onChange={handleChangeID}
              value={containerID}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftAddon children='File' />
            <Input
              placeholder='etc/passwd'
              onChange={handleChangeFile}
              value={file}
            />
          </InputGroup>
          <Button
            isLoading={load}
            loadingText="Fetching File Data"
            onClick={handleDownload}
            marginTop="10px"
            bg="teal.300"
            _hover={{ bg: "teal.400" }}
          >
            Get File Data
          </Button>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Container: {containerID.slice(0,12)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">Metadata</Text>
            <Grid bg="gray.200" templateColumns="repeat(5, 1fr)">
              <Text fontSize="lg" fontWeight="700">Mode</Text>
              <Text fontSize="lg" fontWeight="700">Size</Text>
              <Text fontSize="lg" fontWeight="700">UID</Text>
              <Text fontSize="lg" fontWeight="700">GID</Text>
              <Text fontSize="lg" fontWeight="700">Date</Text>

              <Text fontSize="lg">{metadata.mode}</Text>
              <Text fontSize="lg">{metadata.size}</Text>
              <Text fontSize="lg">{metadata.uid}</Text>
              <Text fontSize="lg">{metadata.gid}</Text>
              <Text fontSize="lg">{metadata.date}</Text>
            </Grid>

            <Text fontSize="lg" marginTop="20px">File Data</Text>
            <Grid bg="gray.200" templateColumns="repeat(2, 1fr)">
              <Text fontSize="lg" fontWeight="700">Sha256</Text>
              <Text fontSize="lg" fontWeight="700">File Type</Text>

              <Text fontSize="lg" marginRight="10">{filedata.hashsum}</Text>
              <Text fontSize="lg">{filedata.type}</Text>
            </Grid>

            <Box>
              <Text fontSize="lg" marginTop="20px">Strings</Text>
              <Code
                bg="gray.200"
                display="block"
                whiteSpace="pre"
                children={filedata.strings}
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
