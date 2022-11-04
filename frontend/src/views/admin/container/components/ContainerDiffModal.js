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
  Text,
  Code,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import "views/admin/container/index.css"

import axios from "axios";
import { useEffect, useState } from "react";

const API = "127.0.0.1:3000"

export default function ContainerDiffModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [data, setData] = useState([]);

  useEffect(async () => {
    if (!id) return;

    const containerDiff = (await axios.get(`http://${API}/api/container/diff/${id}`)).data.response.diff;

    const add = containerDiff.Add;
    const edit = containerDiff.Edit;
    const del = containerDiff.Delete;

    let codeblock = [];
    const header =(
      <>
        <Code
          bg="gray.200"
          fontWeight="700"
          display="block"
          whiteSpace="pre"
          children="Added"
          style={{ whiteSpace: "pre-wrap" }}
        />
        <Code
          bg="gray.200"
          fontWeight="700"
          display="block"
          whiteSpace="pre"
          children="Edited"
          style={{ whiteSpace: "pre-wrap" }}
        />
        <Code
          bg="gray.200"
          fontWeight="700"
          display="block"
          whiteSpace="pre"
          children="Deleted"
          style={{ whiteSpace: "pre-wrap" }}
        />
      </>
    )
    codeblock.push(header);

    for (let i = 0; i < Math.max(add.length, edit.length, del.length); i++) {
        let code = (
        <>
          <Code
            bg="gray.200"
            display="block"
            whiteSpace="pre"
            children={add[i]}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <Code
            bg="gray.200"
            display="block"
            whiteSpace="pre"
            children={edit[i]}
            style={{ whiteSpace: "pre-wrap" }}
          />
          <Code
            bg="gray.200"
            display="block"
            whiteSpace="pre"
            children={delete[i]}
            style={{ whiteSpace: "pre-wrap" }}
          />
          </>
        )

      codeblock.push(code);
    }

    setData(codeblock);

  }, []);


  return (
    <>
    <Button onClick={onOpen} margin="5px" bg="cyan.500" _hover={{ bg: "cyan.600" }}>View File Difference</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Container ID: {id.slice(0,12)}</Text>
            <Text fontSize="lg">Diff</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
      <Box bg="gray.200">
              <Grid templateColumns="repeat(3, 1fr)">
                {data.map((element) => {return element})}
              </Grid>
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

