// Chakra imports
import ColumnsTable from "views/admin/container/components/ColumnsTable";
import ContainerModal from "views/admin/container/components/ContainerModal";

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const API = "127.0.0.1:3000"

const columnsData = [
  {
    Header: "Container ID",
    accessor: "id",
  },
  {
    Header: "Container Name",
    accessor: "name",
  },
  {
    Header: "IMAGE ID",
    accessor: "image",
  },
  {
    Header: "COMMAND",
    accessor: "cmd",
  },
  {
    Header: "INFO",
    accessor: "info",
  },
];

export default function ContainerInfo() {
  const [truncInfo, setTruncInfo] = useState([{id: "", name: "", image: "", cmd: ""}]);

  useEffect(async () => {
    const containerIDs = (await axios.get(`http://${API}/api/container/id`)).data.response;

    const containerInfo = (await Promise.all(
      containerIDs.map((id) => {
        return axios.get(`http://${API}/api/container/info/${id}`)
      })
    )).map((response) => {
      return response.data.response;
    });

    const truncContainerInfo = containerInfo.map((info) => {
      return {
        id: info.Id,
        name: info.Name.slice(1),
        image: info.Image.slice(7).slice(0, 12),
        cmd: `${info.Path} ${info.Args.join(' ')}`,
        info: <ContainerModal id={info.Id} />,
      };
    });

    setTruncInfo(truncContainerInfo);

  }, []);


  return (
    <>
      <ColumnsTable header="Information" columnsData={columnsData} tableData={truncInfo} />
    </>
  );
}
