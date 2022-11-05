// Chakra Imports
import {
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom Components
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React from "react";
// Assets
import routes from "routes.js";
import { ThemeEditor } from "./ThemeEditor";
export default function HeaderLinks(props) {
  const { secondary } = props;
  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");ß
  return (
    <Flex>
      <SidebarResponsive routes={routes} />
      <ThemeEditor navbarIcon={navbarIcon} /> 
    </Flex> 
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
