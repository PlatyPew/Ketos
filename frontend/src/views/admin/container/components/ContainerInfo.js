// Chakra imports
import ColumnsTable from "views/admin/container/components/ColumnsTable";

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
];

const tableData = [
  {
    id: "9af9a54b68894d8f8a5efcca9cb8f37b7589ea50de794f279045a0c483a0e4ff",
    name: "helper",
    image: "9f4353518868",
    cmd: "python3 -m http.server",
  },
]

export default function ContainerInfo() {
  const [truncInfo, setTruncInfo] = useState([{id: "", name: "", image: "", cmd: ""}]);
  const [info, setInfo] = useState();

  useEffect(async () => {
    const containerIDs = (await axios.get(`http://${API}/api/container/id`)).data.response;

    const containerInfo = (await Promise.all(
      containerIDs.map((id) => {
        return axios.get(`http://${API}/api/container/info/${id}`)
      })
    )).map((response) => {
      return response.data.response;
    });

    setInfo(containerInfo);

    const truncContainerInfo = containerInfo.map((info) => {
      return {
        id: info.Id,
        name: info.Name.slice(1),
        image: info.Image.slice(7).slice(0, 12),
        cmd: `${info.Path} ${info.Args.join(' ')}`,
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
