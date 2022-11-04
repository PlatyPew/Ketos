// Chakra imports
import ColumnsTable from "views/admin/network/components/ColumnsTable";
import NetworkInfoModal from "views/admin/network/components/NetworkInfoModal";

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const API = "127.0.0.1:3000"

const columnsData = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "SUBNET",
    accessor: "subnet",
  },
  {
    Header: "DRIVER",
    accessor: "driver",
  },
  {
    Header: "INFO",
    accessor: "info",
  },

];

export default function NetworkInfo() {
  const [truncInfo, setTruncInfo] = useState([{ id: "", subnet: "", driver: "" }]);

  useEffect(async () => {
    const networkIDs = (await axios.get(`http://${API}/api/network/id`)).data.response;


    const networkInfo = (await Promise.all(
      networkIDs.map((id) => {
        return axios.get(`http://${API}/api/network/info/${id}`)
      })
    )).map((response) => {
      return response.data.response;

    });

    const truncNetworkInfo = networkInfo.map((info) => {
      const ipamConf = info.IPAM.Config
      return {
        id: info.Id,
        subnet : ipamConf.length === 0 ? "NIL" : ipamConf[0].Subnet,
        driver: info.IPAM.Driver,
        info: <NetworkInfoModal id={info.Id} />,
      };
    });
    
    

    setTruncInfo(truncNetworkInfo);

  }, []);


  return (
    <>
        <ColumnsTable header="Information" columnsData={columnsData} tableData={truncInfo} />
    </>
  );
}
