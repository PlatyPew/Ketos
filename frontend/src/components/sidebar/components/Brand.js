import React from "react";

// Chakra imports
import { Flex, useColorModeValue, Text } from "@chakra-ui/react";

// Custom components
//import { HorizonLogo } from "components/icons/Icons";
import MyImageSvg from '../../../assets/img/ketos4096.svg';
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Text h='35px' w='175px' my='40px' fontSize='5xl' as='b' color={logoColor} >
        KETOS</Text>
      
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;

//<HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /><MyImageSvg />