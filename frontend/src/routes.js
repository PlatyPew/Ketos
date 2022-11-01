import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  //MdPerson,
  MdHome,
  MdImage,
  MdSquareFoot
  //MdLock,
  //MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
//import NFTMarketplace from "views/admin/marketplace";
//import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import Image from "views/admin/image";
import Container from "views/admin/container";
import Network from "views/admin/network";
import Volume from "views/admin/volume";
//import RTL from "views/admin/rtl";

// Auth Imports
//import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Container Dashboard",
    layout: "/admin",
    path: "/container",
    icon: <Icon as={MdSquareFoot} width='20px' height='20px' color='inherit' />,
    component: Container,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Image",
    layout: "/admin",
    icon: <Icon as={MdImage} width='20px' height='20px' color='inherit' />,
    path: "/image",
    component: Image,
  },
  {
    name: "Network",
    layout: "/admin",
    icon: <Icon as={MdImage} width='20px' height='20px' color='inherit' />,
    path: "/network",
    component: Network,
  },
  {
    name: "Volume",
    layout: "/admin",
    icon: <Icon as={MdImage} width='20px' height='20px' color='inherit' />,
    path: "/volume",
    component: Volume,
  },
  /*{
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
  },
  {
    name: "RTL Admin",
    layout: "/rtl",
    path: "/rtl-default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: RTL,
  },
    {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },*/
];

export default routes;
