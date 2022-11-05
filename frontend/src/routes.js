import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  //MdPerson,
  MdArchive,
  MdStorage,
} from "react-icons/md";

import {
  ImDownload
} from "react-icons/im";

import {
  SiLinuxcontainers,
} from "react-icons/si";

import {
  HiMagnifyingGlass,
} from "react-icons/hi2";


import {
  FaNetworkWired,
  FaHandPointRight,
} from "react-icons/fa";

// Admin Imports
import MainDashboard from "views/admin/default";
import Image from "views/admin/image";
import Container from "views/admin/container";
import Network from "views/admin/network";
import Volume from "views/admin/volume";
import StaticAnalysis from "views/admin/staticanalysis";
import DynamicAnalysis from "views/admin/dynamicanalysis";


const routes = [
  {
    name: "Acquisition",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={ImDownload} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Image",
    layout: "/admin",
    icon: <Icon as={MdArchive} width='20px' height='20px' color='inherit' />,
    path: "/image",
    component: Image,
  },
    {
    name: "Container",
    layout: "/admin",
    icon: <Icon as={SiLinuxcontainers} width='20px' height='20px' color='inherit' />,
    path: "/container",
    component: Container,
  },
  {
    name: "Network",
    layout: "/admin",
    icon: <Icon as={FaNetworkWired} width='20px' height='20px' color='inherit' />,
    path: "/network",
    component: Network,
  },
  {
    name: "Volume",
    layout: "/admin",
    icon: <Icon as={MdStorage} width='20px' height='20px' color='inherit' />,
    path: "/volume",
    component: Volume,
  },
  {
    name: "Static Analysis",
    layout: "/admin",
    path: "/staticanalysis",
    icon: <Icon as={HiMagnifyingGlass} width='20px' height='20px' color='inherit' />,
    component: StaticAnalysis,
  },
  {
    name: "Dynamic Analysis",
    layout: "/admin",
    path: "/dynamicanalysis",
    icon: <Icon as={FaHandPointRight} width='20px' height='20px' color='inherit' />,
    component: DynamicAnalysis,
  },
];

export default routes;
