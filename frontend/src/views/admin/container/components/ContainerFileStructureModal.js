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
  useDisclosure,
} from "@chakra-ui/react";
import "views/admin/container/index.css"

import axios from "axios";
import { useEffect, useState } from "react";

import TreeView, { flattenTree } from "react-accessible-treeview";

const API = "127.0.0.1:3000"

export default function ContainerInfoModal(props) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [data, setData] = useState(flattenTree({name: "", children: []}));

  const parseData = (paths) => {
    let result = [];
    let level = { result };

    paths.forEach((path) => {
        path.split("/").reduce((r, name, i, a) => {
            if (!r[name]) {
                r[name] = { result: [] };
                if (name !== "") r.result.push({ name, children: r[name].result });
            }

            return r[name];
        }, level);
    });

    return result;
  }

  useEffect(async () => {
    if (!id) return;

    const containerFS = (await axios.get(`http://${API}/api/container/filestruct/${id}`)).data.response;
    const parsed = {name: "", children: parseData(containerFS)};
    setData(flattenTree(parsed));

  }, []);

  return (
    <>
    <Button onClick={onOpen} margin="5px" bg="purple.300" _hover={{ bg: "purple.400" }}>View File Structure</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="2xl">Container ID: {id.slice(0,12)}</Text>
            <Text fontSize="lg">Information</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
      <Box bg="gray.200" className="directory">
        <TreeView
          data={data}
          aria-label="directory tree"
          defaultExpandedIds={Array.from({length: 1000},(_,x) => x+1)}
          nodeRenderer={({
            element,
            getNodeProps,
            level,
          }) => (
            <div {...getNodeProps()} style={{ paddingLeft: 20 * (level - 1) }}>
              <Text>{element.name}</Text>
            </div>
          )}
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
