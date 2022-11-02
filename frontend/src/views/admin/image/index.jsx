/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box } from "@chakra-ui/react";
import ImageInfoTable from "views/admin/image/components/ImageInfoTable"; // Image INFO 
import ImageID from "views/admin/image/components/ImageID"; //Image ID
import ImageDockerFile from "views/admin/image/components/ImageDockerFile"; // Image Docker File 
import ImageLayer from "views/admin/image/components/ImageLayer"; // Image Layer
import {
  columnsDataImageInfo,
  columnsDataImageDockerFile,
  columnsDataImageLayer,
  columnsDataImageID
} from "views/admin/image/variables/columnsData"; // Header and accessor file 
import tableDataImageInfo from "views/admin/image/variables/image-info.json"; // Image INFO data
import tableDataImageID from "views/admin/image/variables/image-id.json"; //Image ID data
import tableDataImageDockerFile from "views/admin/image/variables/image-dockerfile.json"; // Image DockerFile data
import tableDataImageLayer from "views/admin/image/variables/image-dockerfile.json"; // Image Layer data
import { json2array } from "../default/components/json2array"; // Function for converting json objects to array
import React from "react";


export default function Settings() {
  // Chakra Color Mode
  return ( 
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
           
        <ImageInfoTable
          columnsData={columnsDataImageInfo}
          tableData={json2array(tableDataImageInfo)}
        />
        <br></br>
        <ImageID
          columnsData={columnsDataImageID}
          tableData={json2array(tableDataImageID)}
        />
        <br></br>
        <ImageDockerFile
          columnsData={columnsDataImageDockerFile}
          tableData={json2array(tableDataImageDockerFile)}
        />
        <br></br>
        <ImageLayer
          columnsData={columnsDataImageLayer}
          tableData={json2array(tableDataImageLayer)}
        />

    </Box>
  );  
}
