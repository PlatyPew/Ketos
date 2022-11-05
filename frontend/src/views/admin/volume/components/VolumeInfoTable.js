// Chakra imports
import ColumnsTable from "views/admin/volume/components/ColumnsTable";
import VolumeInfoModal from "views/admin/volume/components/VolumeInfoModal";

import React from "react";
import { useState, useEffect } from "react";

import axios from "axios";

const API = "127.0.0.1:3000"

const columnsData = [
  {
    Header: "NAME",
    accessor: "name",
  },
  {
    Header: "MOUNTPOINT",
    accessor: "mntpt",
  },
  {
    Header: "LABELS",
    accessor: "labels",
  },
  {
    Header: "INFO",
    accessor: "info",
  },

];

export default function VolumeInfo() {
  const [truncInfo, setTruncInfo] = useState([{ name: "", mntpt: "", labels: "" }]);

  useEffect(async () => {
    const volumeIDs = (await axios.get(`http://${API}/api/volume/id`)).data.response;


    const volumeInfo = (await Promise.all(
      volumeIDs.map((id) => {
        return axios.get(`http://${API}/api/volume/info/${id}`)
      })
    )).map((response) => {
      return response.data.response;

    });

    const truncVolumeInfo = volumeInfo.map((info) => {
      return {
        name: info.Name,
        labels: info.Labels === null ? "NIL" : JSON.stringify(info.Labels),
        mntpt: info.Mountpoint,
        info: <VolumeInfoModal id={info.Name} />,
      };
    });

    setTruncInfo(truncVolumeInfo);

  }, []);


  return (
    <>
        <ColumnsTable header="Information" columnsData={columnsData} tableData={truncInfo} />
    </>
  );
}
