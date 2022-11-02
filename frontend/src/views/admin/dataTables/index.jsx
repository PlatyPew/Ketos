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
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import ContainerIDTable from "views/admin/dataTables/components/ContainerID";
import ContainerDiffTable from "views/admin/dataTables/components/ContainerDiff";
import ContainerLogsTable from "views/admin/dataTables/components/ContainerLogs";
import {
  columnsDataDevelopment, // Kazy change name but container info
  columnsDataContainerID,
  columnsDataContainerDiff,
  columnsDataContainerLogs,
} from "views/admin/dataTables/variables/columnsData";
import tableDataDevelopment from "views/admin/dataTables/variables/container-info.json";
import tableDataContainerID from "views/admin/dataTables/variables/container-id.json";
import tableDataContainerDiff from "views/admin/dataTables/variables/container-diff.json";
import tableDataContainerLogs from "views/admin/dataTables/variables/container-logs.json";
import { json2array } from "../default/components/json2array";
import React from "react";

export default function Settings() {
  // Chakra Color Mode
  //console.log(tableDataDevelopment["response"])
  console.log(json2array(tableDataContainerDiff.response.diff))
 //console.log(test)
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={json2array(tableDataDevelopment)}
        />
        <br></br>
        <ContainerIDTable
          columnsData={columnsDataContainerID}
          tableData={json2array(tableDataContainerID)}
        />
        <br></br>
        <ContainerDiffTable
          columnsData={columnsDataContainerDiff}
          tableData={json2array(tableDataContainerDiff.response.diff)}
        />
        <br></br>
        <ContainerLogsTable
          columnsData={columnsDataContainerLogs}
          tableData={json2array(tableDataContainerLogs)}
        />

    </Box>
  );
}
