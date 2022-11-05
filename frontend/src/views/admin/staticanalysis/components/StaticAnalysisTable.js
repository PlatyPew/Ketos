// Chakra imports
import ColumnsTable from "views/admin/staticanalysis/components/ColumnsTable";
import StaticAnalysisFiledata from "views/admin/staticanalysis/components/StaticAnalysisFiledata"

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const API = "127.0.0.1:3000"

const columnsData = [
  {
    Header: "IMAGE ID",
    accessor: "id",
  },
  {
    Header: "VULN TITLE",
    accessor: "title",
  },
  {
    Header: "SEVERITY",
    accessor: "severity",
  },
  {
    Header: "SUMMARY",
    accessor: "summary",
  },

];

export default function StaticAnalInfo() {
  const [truncInfo, setTruncInfo] = useState([{ id: "", title: "", severity: "" }]);

  const getVuln = async (id) => {
    try {
      return {
        id: id,
        data: (await axios.get(`http://${API}/api/static/vuln/${id}`)).data.response
      };
    } catch {
      return {};
    }
  }

  useEffect(async () => {
    const imageIDs = (await axios.get(`http://${API}/api/image/id`)).data.response;

    const vuln = await Promise.all(imageIDs.map((id) => {
      return getVuln(id);
    }));

    // Remove empty elements
    const results = vuln.filter(element => {
      if (Object.keys(element).length !== 0) {
        return true;
      }

      return false;
    });

    const truncVuln = results.map((element) => {
      let info = element.data;
      return {
        id: element.id.slice(0,12),
        title: info.vulnerabilities[0].title,
        severity: info.vulnerabilities[0].severity,
        summary: info.summary,
      };
    })

    setTruncInfo(truncVuln);
  }, []);


  return (
    <>
      <ColumnsTable header="Image Vulnerabilty Results" columnsData={columnsData} tableData={truncInfo} />
      <StaticAnalysisFiledata />
    </>
  );
}
