import React from "react";

// Chakra imports
import { Image, Flex } from "@chakra-ui/react";

// Custom components
//import { HorizonLogo } from "components/icons/Icons";
import MyImageSvg from '../../../assets/img/ketos4096.svg';
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  //let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
      <Image
        objectFit='cover'
        boxSize='180px'
        src={MyImageSvg}
        alt='Ketos Logo'/>
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;

//<HorizonLogo h='26px' w='175px' my='32px' color={logoColor} /><MyImageSvg />