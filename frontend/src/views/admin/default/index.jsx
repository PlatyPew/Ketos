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

import { useState } from "react";
//, setState
import {
  Box,
  Button,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import Card from "components/card/Card";
//import { set } from "lodash";

export default function UserReports() {
  // Chakra Color Mode
  //const axios = require("axios");

  const [setAcquireDone] = useState(false);
  const [isButtonLoad, setIsButtonLoad] = useState(false);
  //acquireDone,
  const handleAcquire = async (e) => {
    e.preventDefault();
    const port = e.target.portNo.value;
    const host = e.target.hostIP.value;

    setIsButtonLoad(true);

    console.log("Host: " + host);
    console.log("Port: " + port);

    await axios.put(`http://127.0.0.1:3000/api/socket`, null, {
      params: { host: host, port: port },
    });
    console.log("Waiting");
    const out = await axios.put(`http://127.0.0.1:3000/api/acquire`);
    console.log(out.data.response);
    if (out.data.response === true) {
      setAcquireDone(true);
      setIsButtonLoad(false);
      console.log("Acquiring was successfully completed");
    } else {
      setIsButtonLoad(false);
      console.log("Acquiring Failed");
    }
  };

  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (

    <Box borderWidth='1px' borderRadius='lg' overflow='hidden' pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Card direction='column'
        w='100%'
        px='0px'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex px='25px' justify='space-between' mb='15px' align='center'>
          <Text
            color={textColor}
            fontSize='3xl'
            as='b'
            lineHeight='100%'>
            Acquisition
          </Text>
        </Flex>
        <Box p='6' pt={{ base: "15px", md: "15px", xl: "15px" }}>
          <Stack spacing={3}>

            <Text fontSize='2xl' as='b'>
              ***ONLY USE THE ACQUITE FUNCTION ONCE PER IP****</Text>
            <Text fontSize='1xl' as='b'>
              Please input in Host IP and Port number.</Text>

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
              {isButtonLoad ? (
                <Button
                  isLoading
                  loadingText="Acquiring"
                  type="Submit"
                  colorScheme="teal"
                  size="md"
                >
                  Acquire
                </Button>
              ) : (
                <Button type="Submit" colorScheme="teal" size="md">
                  Acquire
                </Button>
              )}
            </form>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}
