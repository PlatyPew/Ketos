// Chakra imports
import ColumnsTable from "views/admin/volume/components/ColumnsTable";
import StaticAnalysisFiledata from "views/admin/staticanalysis/components/StaticAnalysisFiledata"

import React from "react";
import { useState, useEffect } from "react";

import {
  Grid,
} from "@chakra-ui/react";

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

export default function StaticAnalInfo() {
  const [truncInfo, setTruncInfo] = useState([{ id: "", title: "", severity: "" }]);

  useEffect(async () => {
    const imageIDs = (await axios.get(`http://${API}/api/image/id`)).data.response;


    const staticanalInfo = (await Promise.all(
      imageIDs.map((id) => {
        const out = axios.get(`http://${API}/api/static/vuln/${id}`)
        return out

      })
    )).map((response) => {

      return response.data.response;

    });

    const truncStaticAnalInfo = staticanalInfo.map((info) => {
      console.log(info.vulnerabilities)
      return {
        id: info.id,
        title: info.vulnerabilities[0].title, //=== null ? "NIL" : info.Labels,
        severity: info.vulnerabilities.severity,
        //info: <VolumeInfoModal id={info.Name} />,
      };
    });

    setTruncInfo(truncStaticAnalInfo);

  }, []);


  return (
    <>
      <ColumnsTable header="Vulnerabilty Results" columnsData={columnsData} tableData={truncInfo} />
      <StaticAnalysisFiledata />
    </>
  );
}
