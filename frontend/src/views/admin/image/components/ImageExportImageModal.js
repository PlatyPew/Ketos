import React from "react";

import {
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { saveAs } from 'file-saver'
import { useState } from "react";

const API = "127.0.0.1:3000"

export default function ImageExportImageModal(props) {
  const { id } = props;

  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!id) return;

    setLoading(true);
    const out = await axios.get(`http://${API}/api/image/fs/${id.slice(7)}`, {
      responseType: 'blob'
    });

    saveAs(out.data, `image-${id.slice(7)}.tgz`);
    setLoading(false);
  };

  return (
    <Button
      isLoading={loading}
      loadingText="Exporting Image"
      onClick={handleDownload}
      margin="5px"
      bg="pink.300"
      _hover={{ bg: "pink.400" }}
    >Export Image</Button>
  );
}
