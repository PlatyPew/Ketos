import React from "react";

import {
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { saveAs } from 'file-saver'

const API = "127.0.0.1:3000"

export default function ContainerExportInfoModal(props) {
  const { id } = props;

  const handleDownload = async () => {
    if (!id) return;

    const out = await axios.get(`http://${API}/api/container/info/${id}/all`, {
      responseType: 'blob'
    });

    saveAs(out.data, `container-${id}.json`);
  };

  return (
    <Button onClick={handleDownload} margin="5px" bg="blue.300" _hover={{ bg: "blue.400" }}>Export All Info</Button>
  );
}
