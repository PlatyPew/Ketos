import React from "react";

import {
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { saveAs } from 'file-saver'
import { useState } from "react";

const API = "127.0.0.1:3000"

export default function ImageExportInfoModal(props) {
  const { id } = props;

  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!id) return;

    setLoading(true);
    const out = await axios.get(`http://${API}/api/image/info/${id.slice(7)}/all`, {
      responseType: 'blob'
    });

    saveAs(out.data, `image-${id.slice(7)}.json`);
    setLoading(false);
  };

  return (
    <Button
      isLoading={loading}
      loadingText="Exporting All Info"
      onClick={handleDownload}
      margin="5px"
      bg="blue.300"
      _hover={{ bg: "blue.400" }}
    >Export All Info</Button>
  );
}
