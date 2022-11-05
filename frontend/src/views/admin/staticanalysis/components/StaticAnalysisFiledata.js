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
  Grid,
  Code,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { saveAs } from 'file-saver'

import axios from "axios";

const API = "127.0.0.1:3000"

export default function StaticAnalysisFiledata(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [containerID, setContainerID] = useState("");
  const [file, setFile] = useState("");
  const [loadFile, setLoadFile] = useState(false);
  const [loadYara, setLoadYara] = useState(false);
  const [loadVT, setLoadVT] = useState(false);
  const [loadVTExport, setLoadVTExport] = useState(false);

  const [displayData, setDisplayData] = useState();

  const handleChangeID = (event) => {
    const value = event.target.value;
    setContainerID(value);
  };
  const handleChangeFile = (event) => {
    const value = event.target.value;
    setFile(value);
  };

  const handleFiledata = async () => {
    if (!containerID || !file) return;

    setLoadFile(true);

    try {
      const metadata = (await axios.get(`http://${API}/api/static/metadata/${containerID}`, {
        params: { file: file },
      })).data.response;

      const filedata = (await axios.get(`http://${API}/api/static/filedata/${containerID}`, {
        params: { file: file },
      })).data.response;

      setDisplayData(
        <>
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
        </>
      );

      onOpen();
    } finally {
      setLoadFile(false);
    }
  }

  const handleYara = async () => {
    if (!containerID || !file) return;

    setLoadYara(true);

    try {
      const yara = (await axios.get(`http://${API}/api/static/match/${containerID}`, {
        params: { file: file },
      })).data.response;

      setDisplayData(
        <>
          <Text fontSize="lg">Yara Scan</Text>

          <Table variant='simple'>
            <Thead>
              <Tr fontWeight="700">
                <Th>Namespace</Th>
                <Th>Description</Th>
                <Th>Rule</Th>
                <Th>Tags</Th>
              </Tr>
            </Thead>
            <Tbody>
              {yara.map((element) => {
                return (
                  <>
                    <Tr>
                      <Td>{element.namespace}</Td>
                      <Td>{element.description}</Td>
                      <Td>{element.rule}</Td>
                      <Td>{JSON.stringify(element.tags)}</Td>
                    </Tr>
                  </>
                )
              })}
            </Tbody>
          </Table>

        </>
      );
      onOpen();
    } finally {
      setLoadYara(false);
    }
  }

  const handleVT = async () => {
    if (!containerID || !file) return;

    setLoadVT(true);
    try {
      const vt = (await axios.get(`http://${API}/api/static/detect/${containerID}`, {
        params: { file: file },
      })).data.response;

      setDisplayData(
        <Box>
          <Code
            bg="gray.200"
            display="block"
            whiteSpace="pre"
            children={JSON.stringify(vt, null, 2)}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </Box>
      )

      onOpen();
    } finally {
      setLoadVT(false);
    }
  }

  const handleVTExport = async () => {
    if (!containerID || !file) return;
    setLoadVTExport(true);

    try {
      const out = await axios.get(`http://${API}/api/static/detect/${containerID}/all`, {
        responseType: 'blob',
        params: { file: file },
      });

      saveAs(out.data, `vt-${containerID}-${file}.json`);

    } finally {
      setLoadVTExport(false);
    }
  }

  return (
    <>
      <Box bg="white" borderRadius='lg' overflow='hidden' margin="5px">
        <Box margin="20px">
          <Stack spacing={4} >
            <Box margin="5px">
              <Text
                fontSize='xl'
                fontWeight='700'
                lineHeight='100%'
              >
                Container Analysis
              </Text>
            </Box>
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
            <Box>
              <Stack direction={['column', 'row']}>
                <Button
                  isLoading={loadFile}
                  loadingText="Fetching File Data"
                  onClick={handleFiledata}
                  bg="blue.200"
                  _hover={{ bg: "blue.300" }}
                >
                  Get File Data
                </Button>
                <Button
                  isLoading={loadYara}
                  loadingText="Scanning File"
                  onClick={handleYara}
                  marginTop="10px"
                  marginLeft="10px"
                  bg="yellow.300"
                  _hover={{ bg: "yellow.400" }}
                >
                  Scan File with Yara
                </Button>
                <Button
                  isLoading={loadVT}
                  onClick={handleVT}
                  loadingText="Scanning File"
                  marginTop="10px"
                  marginLeft="10px"
                  bg="green.300"
                  _hover={{ bg: "green.400" }}
                >
                  Scan File with VirusTotal
                </Button>
                <Button
                  isLoading={loadVTExport}
                  onClick={handleVTExport}
                  loadingText="Exporting File"
                  marginTop="10px"
                  marginLeft="10px"
                  bg="cyan.300"
                  _hover={{ bg: "cyan.400" }}
                >
                  Export File with VirusTotal
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Container: {containerID.slice(0, 12)}</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {displayData}
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
