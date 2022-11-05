import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdImage,
  MdSquareFoot,
  MdLock,
  //MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
//import NFTMarketplace from "views/admin/marketplace";
//import Profile from "views/admin/profile";
import Image from "views/admin/image";
import Container from "views/admin/container";
import Network from "views/admin/network";
import Volume from "views/admin/volume";
import StaticAnalysis from "views/admin/staticanalysis";
//import RTL from "views/admin/rtl";

// Auth Imports
//import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Acquisition",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Image",
    layout: "/admin",
    icon: <Icon as={MdImage} width='20px' height='20px' color='inherit' />,
    path: "/image",
    component: Image,
  },
    {
    name: "Container",
    layout: "/admin",
    icon: <Icon as={MdSquareFoot} width='20px' height='20px' color='inherit' />,
    path: "/container",
    component: Container,
  },
  {
    name: "Network",
    layout: "/admin",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    path: "/network",
    component: Network,
  },
  {
    name: "Volume",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/volume",
    component: Volume,
  },
  {
    name: "Static Analysis",
    layout: "/admin",
    path: "/staticanalysis",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: StaticAnalysis,
  },
];

export default routes;
