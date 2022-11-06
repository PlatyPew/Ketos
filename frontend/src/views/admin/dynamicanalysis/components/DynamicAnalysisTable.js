// Chakra imports
import ColumnsTable from "views/admin/dynamicanalysis/components/ColumnsTable";
import React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Button,
  ButtonGroup,
  Box,
  Text,
  Input,
  InputGroup,
  InputLeftAddon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import { FaDownload } from "react-icons/fa";

import axios from "axios";
import { saveAs } from 'file-saver'

const API = "127.0.0.1:3000"

const columnsData = [
  {
    Header: "CONTAINER ID",
    accessor: "id",
  },
  {
    Header: "INTERFACE",
    accessor: "iface",
  },
  {
    Header: "DOWNLOAD",
    accessor: "download",
  },
];

export default function DynamicAnalInfo() {
  const [containerID, setContainerID] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [display, setDisplay] = useState(<></>);
  const [loadProcess, setLoadProcess] = useState(false);

  const [trafficData, setTrafficData] = useState([]);

  const handleDownload = async (id, iface) => {
    try {
      const out = await axios.get(`http://${API}/api/dynamic/capture/${id}/${iface}`, {
        responseType: 'blob',
      });

      saveAs(out.data, `${id}-${iface}.pcap`);
    } finally {
      
    }
  };

  const handleShell = async() => {
    if (!containerID) return
    try {
      await axios.get(`http://${API}/api/dynamic/shell/${containerID}`)

      setDisplay(
        <Text>
          Connect to port 2323 using
          <pre>socat file:`tty`,raw,echo=0 tcp:127.0.0.1:2323</pre>
        </Text>
      )

      onOpen();
    } finally {}
  };

  useEffect(async () => {
    const id = (await axios.get(`http://${API}/api/dynamic/capture/id`)).data.response;

    let data = [];
    Object.keys(id).forEach((e) => {
        id[e].forEach((i) => {
            data.push({
              id: e,
              iface: i,
              download: <Button onClick={() => {handleDownload(e, i)}}><FaDownload /></Button>,
            });
        });
    });

    setTrafficData(data);

  }, [trafficData]);


  const handleChangeID = (event) => {
    const value = event.target.value;
    setContainerID(value);
  };

  const handleProcesses = async () => {
    if (!containerID) return;

    setLoadProcess(true);
    try {
      const process = (await axios.get(`http://${API}/api/dynamic/process/${containerID}`)).data.response;

      setDisplay(
        <>
          <Box>
            <Text>Resources Used</Text>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Block I/O</Th>
                  <Th>Net I/O</Th>
                  <Th>No. of PIDs</Th>
                  <Th>Memory Usage</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>{process.block_io}</Td>
                  <Td>{process.net_io}</Td>
                  <Td>{process.pid}</Td>
                  <Td>{process.mem_usage} / {process.mem_limit}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>

          <Box marginTop="20px">
            <Text>Process List</Text>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>UID</Th>
                  <Th>PID</Th>
                  <Th>PPID</Th>
                  <Th>LWP</Th>
                  <Th>CMD</Th>
                </Tr>
              </Thead>
              <Tbody>
                  {process.processes.map((p) => {
                    return (
                <Tr>
                        <Td>{p.uid}</Td>
                        <Td>{p.pid}</Td>
                        <Td>{p.ppid}</Td>
                        <Td>{p.lwp}</Td>
                        <Td>{p.cmd}</Td>
                </Tr>
                    )
                  })}
              </Tbody>
            </Table>
          </Box>
        </>
      );

      onOpen();
    } finally {
      setLoadProcess(false);
    }
  };

  return (
    <>
    <Box bg="white" borderRadius='lg' overflow='hidden'>
      <Box margin="20px">
        <Text
          fontSize='xl'
          fontWeight='700'
          lineHeight='100%'>
          Container Dynamic Analysis
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
          <ButtonGroup>
            <Button
              loadingText="Getting Processes"
              marginTop="10px"
              bg="blue.200"
              _hover={{ bg: "blue.300" }}
              onClick={handleProcesses}
              isLoading={loadProcess}
            >
              Get Processes
            </Button>
            <Button
              marginTop="10px"
              bg="yellow.200"
              _hover={{ bg: "yellow.300" }}
              onClick={handleShell}
            >
              Attach to Shell
            </Button>
          </ButtonGroup>
          <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Text fontSize="2xl">Container ID: {containerID.slice(0, 12)}</Text>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {display}
              </ModalBody>
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      </Box>
    </Box>

      <ColumnsTable header="Network Captures" columnsData={columnsData} tableData={trafficData}/>
    </>
  );
}
