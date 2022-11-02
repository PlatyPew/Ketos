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
import NetworkInfoTable from "views/admin/network/components/NetworkTable";
import {
  columnsDataNetwork, 
} from "views/admin/network/variables/columnsData";
import tableDataNetwork from "views/admin/network/variables/network-info.json";
import { json2array } from "../default/components/json2array";
import React from "react";


export default function Settings() {
  // Chakra Color Mode
  //console.log(tableDataImageInfo.response)
  return ( 
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      
      <NetworkInfoTable
          columnsData={columnsDataNetwork}
          tableData={json2array(tableDataNetwork)}
        />

    </Box>
  );  
}

