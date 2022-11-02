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
import VolumeInfoTable from "views/admin/volume/components/VolumeInfoTable";
import { 
  columnsDataVolumeInfo
} from "views/admin/volume/variables/columnsData";
import tableDataVolumeInfo from "views/admin/volume/variables/volume-info.json";
import { json2array } from "../default/components/json2array";
import React from "react";


export default function Settings() {
  // Chakra Color Mode
  //console.log(columnsDataVolumeInfo)
  return ( 
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      
      <VolumeInfoTable
          columnsData={columnsDataVolumeInfo}
          tableData={json2array(tableDataVolumeInfo)}
        />

    </Box>
  );  
}
