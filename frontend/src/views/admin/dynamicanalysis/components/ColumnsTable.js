import {
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import { FaPlay, FaStop } from "react-icons/fa";

import axios from "axios";

// Custom components
import Card from "components/card/Card";

const API = "127.0.0.1:3000";

export default function ColumnsTable(props) {
  const { header, columnsData, tableData } = props;

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
  initialState.pageSize = 5;

  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);

  const handleStart = async() => {
    setStart(true);
    // Axios here
    try {
      await axios.put(`http://${API}/api/analyse/capture/start`);
    } catch (err) {
      setStart(false);
    }
  }

  const handleStop = async() => {
    setStop(true);
    // Axios here
    try {
      await axios.put(`http://${API}/api/analyse/capture/stop`);
    } finally {
      setStart(false);
      setStop(false);
    }
  }

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
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
          {header}
        </Text>
        <ButtonGroup>
          <Button
            bg="green.300"
            _hover={{ bg: "green.400" }}
            isLoading={start}
            loadingText="Capturing"
            onClick={handleStart}
          ><FaPlay /> Start</Button>
          <Button
            bg="red.300"
            _hover={{ bg: "red.400" }}
            isLoading={stop}
            loadingText="Stopping"
            onClick={handleStop}
            disabled={!start}
          ><FaStop /> Stop</Button>
        </ButtonGroup>
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
                    <Text color={textColor} fontSize='sm' fontWeight='700'>
                      {cell.value}
                    </Text>
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
  );
}
