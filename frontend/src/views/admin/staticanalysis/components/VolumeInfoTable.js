// Chakra imports
import ColumnsTable from "views/admin/volume/components/ColumnsTable";
import VolumeInfoModal from "views/admin/volume/components/VolumeInfoModal";

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
    Header: "TITLE",
    accessor: "title",
  },
  {
    Header: "SEVERITY",
    accessor: "severity",
  },
  {
    Header: "INFO",
    accessor: "info",
  },

];

export default function VolumeInfo() {
  const [truncInfo, setTruncInfo] = useState([{ id: "", title: "", severity: "" }]);

  useEffect(async () => {
    const imageIDs = (await axios.get(`http://${API}/api/image/id`)).data.response;


    const analInfo = (await Promise.all(
      imageIDs.map((id) => {
        return axios.get(`http://${API}api/static/vuln/${id}`)
      })
    )).map((response) => {
      return response.data.response;

    });

    const truncStaticAnalInfo = StaticAnalInfo.map((info) => {
      return {
        id: info.Name,
        title: info.vulnerabilities.title, //=== null ? "NIL" : info.Labels,
        severity: info.Mountpoint,
        //info: <VolumeInfoModal id={info.Name} />,
      };
    });

    setTruncInfo(truncStaticAnalInfo);

  }, []);


  return (
    <>
        <ColumnsTable header="Information" columnsData={columnsData} tableData={truncInfo} />
    </>
  );
}
