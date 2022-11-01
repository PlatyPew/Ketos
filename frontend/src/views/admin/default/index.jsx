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
import {
  Box,
  Button,
  Text,
  Stack,
  useColorModeValue,
  Input,
  InputGroup,
  InputLeftAddon,
  useDisclosure,
} from "@chakra-ui/react";

export default function UserReports() {
  // Chakra Color Mode
  const { isOpen, onOpen, onClose } = useDisclosure()
  const brandColor = useColorModeValue("brand.500", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <Text
        color={textColor}
        fontSize="22px"
        fontWeight="700"
        lineHeight="100%"
        paddingBottom="20px"
      >
        Please input in Port number and Host IP
      </Text>
      <Stack spacing={4}>
        <InputGroup>
          <InputLeftAddon children="Port" borderRadius="16px" />
          <Input type="number" placeholder="Port Number" borderRadius="16px" />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon children="Host" borderRadius="16px" />
          <Input
            type="string"
            placeholder="Host IP Address"
            borderRadius="16px"
          />
        </InputGroup>
        <Button colorScheme='teal' size='md' onClick={onOpen}>Acquire</Button>
      </Stack>
    </Box>
  );
}
