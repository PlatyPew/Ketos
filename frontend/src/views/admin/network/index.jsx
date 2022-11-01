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
import DevelopmentTable from "views/admin/network/components/DevelopmentTable";
//import ImageInfoTable from "views/admin/image/components/ImageInfoTable";
import {
  columnsDataDevelopment, 
  //columnsDataImageInfo
} from "views/admin/network/variables/columnsData";
import tableDataDevelopment from "views/admin/network/variables/tableDataDevelopment.json";
//import tableDataImageInfo from "views/admin/network/variables/image-info.json";
import React from "react";


export default function Settings() {
  // Chakra Color Mode
  //console.log(tableDataImageInfo.response)
  return ( 
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      
      <DevelopmentTable
          columnsData={columnsDataDevelopment}
          tableData={tableDataDevelopment}
        />

    </Box>
  );  
}


/*
<SimpleGrid
mb='20px'
columns={{ sm: 1, md: 2 }}
spacing={{ base: "20px", xl: "20px" }}>

        <ImageInfoTable
          columnsData={columnsDataImageInfo}
          tableData={tableDataImageInfo.response}
          
        />
</SimpleGrid>*/