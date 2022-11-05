// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import DynamicAnalysis from "views/admin/dynamicanalysis/components/DynamicAnalysisTable";

export default function DynamicAnal() {
  // Chakra Color Mode
  return ( 
    <Box pt={{ base: "50px", md: "80px", xl: "80px" }}>
    <SimpleGrid
      mb='20px'
      spacing={{ base: "20px", xl: "20px" }}>

        <DynamicAnalysis />
    </SimpleGrid>
  </Box>
  );  
}
