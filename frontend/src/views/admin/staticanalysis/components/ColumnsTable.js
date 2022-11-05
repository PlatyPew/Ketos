import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  Input,
  InputGroup,
  InputLeftAddon,
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AddIcon } from '@chakra-ui/icons'
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import axios from "axios";
// Custom components
import Card from "components/card/Card";

const API = "127.0.0.1:3000"
export default function ColumnsTable(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { header, columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

  const [imageID, setImageID] = useState("");
  const [scan, setScan] = useState(false);

  const handleImageID = async (event) => {
    const value = event.target.value;
    setImageID(value);
  };

  const handleVulnScan = async() => {
    if (!imageID) return;

    setScan(true);
    try {
      await axios.put(`http://${API}/api/analyse/vuln/${imageID}`);
    } finally {
      setScan(false);
    }

  };

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 5;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  return (
    <>
    <Card
      direction='column'
      w='100%'
      px='0px'
      overflowX={{ sm: "scroll", lg: "hidden" }}>
      <Flex px='25px' justify='space-between' mb='20px' align='center'>
        <Text
          color={textColor}
          fontSize='22px'
          fontWeight='700'
          lineHeight='100%'>
          {header}
        </Text>

        <Button
          bg="gray.100"
          onClick={onOpen}
        >
          <AddIcon />
        </Button>
      </Flex>
      <Table {...getTableProps()} variant='simple' color='gray.500' mb='24px'>
        <Thead>
          {headerGroups.map((headerGroup, index) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  pe='10px'
                  key={index}
                  borderColor={borderColor}>
                  <Flex
                    justify='space-between'
                    align='center'
                    fontSize={{ sm: "10px", lg: "12px" }}
                    color='gray.400'>
                    {column.render("Header")}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={row.values.id}>
                {row.cells.map((cell, index) => {
                  let data = (
                    <Box overflow="hidden">
                      <Text color={textColor} fontSize="sm" fontWeight="700" maxW="sm" isTruncated>
                        {cell.value}
                      </Text>
                    </Box>
                  );
                  return (
                    <Td
                      {...cell.getCellProps()}
                      key={index}
                      fontSize={{ sm: "14px" }}
                      minW={{ sm: "100px", md: "100px", lg: "auto" }}
                      borderColor='transparent'>
                      {data}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Card>
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="outside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontSize="2xl">Image Vulnerability Scan</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup marginBottom={2}>
            <InputLeftAddon children='ID' />
            <Input
              placeholder='0b5a4d09aba0053c03977723919729ea3148cf23c8d03eca9aae21607c6e2769'
              value={imageID}
              onChange={handleImageID}
            />
          </InputGroup>
          <Button
              bg="teal.200"
              _hover={{ bg: "teal.300" }}
              marginTop="10px"
              loadingText="Scanning"
              isLoading={scan}
              onClick={handleVulnScan}
            >
              Scan Image
            </Button>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  )
}
