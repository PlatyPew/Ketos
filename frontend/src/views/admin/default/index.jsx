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
import axios from "axios";

import { useState, setState } from "react";

import {
  Box,
  Button,
  Text,
  Stack,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { set } from "lodash";

export default function UserReports() {
  // Chakra Color Mode
  //const axios = require("axios");

  const [acquireDone, setAcquireDone] = useState(false);

  const handleAcquire = async (e) => {
    e.preventDefault();
    const port = e.target.portNo.value;
    const host = e.target.hostIP.value;
    
    console.log("Host: " + host);
    console.log("\nPort: " + port);

    await axios.put(`http://127.0.0.1:3000/api/socket`, null, { params: { host: host, port: port } });
    console.log("Waiting");
    const out = await axios.put(`http://127.0.0.1:3000/api/acquire`);
    console.log(out.data.response);
    if (out.data.response === true){
      setAcquireDone(true);
    }
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Text
        color={textColor}
        fontSize="22px"
        fontWeight="700"
        lineHeight="100%"
        paddingBottom="20px"
      >
        Please input in Host IP and Port number. <br></br>
        Please only use the Acquire function once per IP.
      </Text>
      <Stack spacing={4}>
        <form onSubmit={handleAcquire}>

        <InputGroup paddingBlock="10px">
            <InputLeftAddon children="Host IP" borderRadius="16px" />
            <Input
              type="float"
              name="hostIP"
              placeholder="Host IP Address"
              borderRadius="16px"
            />
          </InputGroup>

          <InputGroup paddingBlock="10px">
            <InputLeftAddon children="Port No." borderRadius="16px" />
            <Input
              type="number"
              name="portNo"
              placeholder="Port Number"
              borderRadius="16px"
            />
          </InputGroup>
          <Button type='Submit' colorScheme="teal" size="md">
            Acquire
          </Button>
        </form>
      </Stack>
    </Box>
  );
}
