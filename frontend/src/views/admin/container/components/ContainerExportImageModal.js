import React from "react";

import {
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { saveAs } from 'file-saver'

const API = "127.0.0.1:3000"

export default function ContainerExportImageModal(props) {
  const { id } = props;

  const handleDownload = async () => {
    if (!id) return;

    const out = await axios.get(`http://${API}/api/container/fs/${id}`, {
      responseType: 'blob'
    });

    saveAs(out.data, `container-${id}.tgz`);
  };

  return (
    <Button onClick={handleDownload} margin="5px" bg="pink.300" _hover={{ bg: "pink.400" }}>Export Container Image</Button>
  );
}
