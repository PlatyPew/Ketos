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
  Code,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "axios";
import { useEffect, useState } from "react";
import TreeView, { flattenTree } from "react-accessible-treeview";

const API = "127.0.0.1:3000"

export default function ImageLayerModal(props) {
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


  const handleDownload = async () => {
    if (!id) return;

    const imageLayer = (await axios.get(`http://${API}/api/image/layer/${id.slice(7)}`)).data.response;

    const layers = Object.keys(imageLayer).map((layer, i) => {
      return {
        name: `> Layer ${i+1} - ${layer}`,
        children: [
          { name: "> Added Files", children: parseData(imageLayer[layer].Add) },
          { name: "> Edited Files", children: parseData(imageLayer[layer].Edit) },
          { name: "> Deleted Files", children: parseData(imageLayer[layer].Delete) },
        ]
      }
    });

    setData(flattenTree({name: "", children: layers}))
  };

  const handleOpen = () => {
    handleDownload();
    onOpen();
  }

  return (
    <>
    <Button onClick={handleOpen} margin="5px" bg="purple.300" _hover={{ bg: "purple.400" }}>View Layers</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" scrollBehavior="outside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2xl">
            Image ID: {id.slice(7, 19)}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="lg">Layers</Text>
            <Box bg="gray.200" className="directory">
              <TreeView
                data={data}
                aria-label="directory tree"
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
