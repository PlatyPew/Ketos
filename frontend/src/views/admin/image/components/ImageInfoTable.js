/* eslint-disable */
import {
  Flex,
  //Progress,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Icon
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card";
import React, { useMemo } from "react";
//import { AndroidLogo, AppleLogo, WindowsLogo } from "components/icons/Icons";
//import Menu from "components/menu/MainMenu";
//import TreeItem from '@mui/lab/TreeItem';
//import TreeView from '@mui/lab/TreeView';
//import { MdArrowDropDown, MdChevronRight } from 'react-icons/md'
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

export default function ImageInfoTable(props) {
  const { columnsData, tableData } = props;

  const columns = useMemo(() => columnsData, [columnsData]);
  const data = useMemo(() => tableData, [tableData]);

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
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  //const iconColor = useColorModeValue("secondaryGray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  const { isOpen, onOpen, onClose } = useDisclosure()


    return (
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
            Image Info Table
          </Text>
          <Button onClick={onOpen}>View full data</Button>
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
                <Tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    let data = "";
                    if (cell.column.Header === "Architecture") {
                      data = (
                        <Text color={textColor} fontSize="xl" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "User") {
                      data = (
                        <Text color={textColor} fontSize="xl" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    } else if (cell.column.Header === "WorkingDir") {
                      data = (
                        <Text color={textColor} fontSize="xl" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
                    }
                    else if (cell.column.Header === "Button") {
                      data = (
                        <Button onClick={onOpen}>View full data</Button>
                      );
                    }
                    return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {data}

                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>


        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Container Data</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="brand" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Export</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Card>
    );
  }