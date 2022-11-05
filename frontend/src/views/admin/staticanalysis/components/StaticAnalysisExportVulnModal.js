import React, {useState} from "react";

import {
  Button,
} from "@chakra-ui/react";

import axios from "axios";
import { saveAs } from 'file-saver'

const API = "127.0.0.1:3000"

export default function StaticAnalysisExportVulnModal(props) {
  const { id } = props;
  
  const [load, setLoad] = useState(false);

  const handleDownload = async () => {
    if (!id) return;

    setLoad(true);
    const out = await axios.get(`http://${API}/api/static/vuln/${id}/all`, {
      responseType: 'blob',
    });

    setLoad(false);

    saveAs(out.data, `vuln-${id}.json`);
  };

  return (
    <Button
      margin="5px"
      bg="purple.300"
      _hover={{ bg: "purple.400" }}
      onClick={handleDownload}
      isLoading={load}
      loadingText="Exporting Vuln Info"
    >
      Export Vuln Info
    </Button>
  );
}
