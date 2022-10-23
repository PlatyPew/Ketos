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
import { Box, SimpleGrid } from "@chakra-ui/react";
import ColumnsTable from "views/admin/container/components/ColumnsTable";
import ContainerTable from "views/admin/container/components/ContainerTable";
import {
  columnsDataColumns,
  columnsDataContainer,
} from "views/admin/container/variables/columnsData";
import tableDataColumns from "views/admin/container/variables/tableDataColumns.json";
import tableDataContainer from "views/admin/container/variables/container1.json";

import React from "react";

export default function Settings() {

  //tableDataContainer = JSON.stringify(tableDataContainer);
  //tableDataContainer = JSON.parse(tableDataContainer);
  //console.log(tableDataContainer);
  //console.log(ContainerTable);
  // Chakra Color Mode
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}>
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />

        
      
      </SimpleGrid>
      
    </Box>
  /*
        <ColumnsTable
          columnsData={columnsDataColumns}
          tableData={tableDataColumns}
        />*/  
  );
  
}
